import { Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useSupabaseAuth } from "../../supabase";


export function Layout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || '';
    const [input, setInput] = useState(query);
    const { user, setUser } = useUserContext();
    const { logout } = useSupabaseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setInput(query);
    }, [query]);

    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);
        setSearchParams(val ? { query: val } : {});
    };

    const clearSearch = () => {
        setInput('');
        setSearchParams({});
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
        }
    };

    // 로그인 상태에 따른 메뉴 분기 UI
    const renderUserMenu = () => {
        if (!user) {
            // 로그인 안한 상태
            return (
                <>
                    <Link to="login" className="text-white">로그인</Link>
                    <Link to="signup" className="text-white">회원가입</Link>
                </>
            );
        } else {
            // 로그인 한 상태: 유저 썸네일 + 메뉴
            return (
                <div className="relative group">
                    {/* 유저 썸네일 - 임시로 이름 첫 글자 혹은 기본 아이콘 */}
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer text-white font-bold select-none">
                        {user?.user_metadata?.full_name?.[0]
                            ? user.user_metadata.full_name[0]
                            : user?.email?.[0] ?? "?"}
                    </div>

                    {/* 숨겨진 메뉴: 마이페이지, 로그아웃 */}
                    <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Link to="mypage" className="block px-4 py-2 text-white hover:bg-gray-700">마이페이지</Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-full h-[4em] items-center px-10 shadow-[0_0_10px_black] nav">
                <nav>
                    <Link
                        to="/"
                        className="text-[2em] font-extrabold text-white tracking-[-5px]"
                        onClick={clearSearch}
                    >
                        Movie_Topia
                    </Link>
                </nav>
                <div className="flex flex-row gap-7 items-center">
                    <div>
                        <input
                            value={input}
                            onChange={handleChange}
                            className="border-b border-white text-white input"
                            placeholder="검색"
                        />
                        <span
                            onClick={clearSearch}
                            className="inline-block transform rotate-[110deg] text-white font-extrabold text-[1.3em] cursor-pointer"
                        >
                            ☌
                        </span>
                    </div>
                    {/* 로그인 상태에 따른 메뉴 렌더 */}
                    {renderUserMenu()}
                </div>
            </div>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
