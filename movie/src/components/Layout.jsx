import { Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSupabase } from "../supabase/context";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";

export default function Layout() {
    const [searchParams, setSearchParams] = useSearchParams();
    //url 쿼리 파라미터를 가져오고 설정함
    const query = searchParams.get("query") || '';
    const [input, setInput] = useState(query);
    const navigate = useNavigate();

    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //모달창 상태관리
    const menuRef = useRef();
    //모달 닫았다 열었다 해도 불필요하게 리렌더 되지 않도록 Ref
    

    const {isLogined, supabaseClient, setIsSignInMode, isDark, user, setIsDark, setPage } = useSupabase();


    //경로에 따라서 로그인/회원가입 모드를 전환함.
    useEffect(() => {
        if (location.pathname === "/signup") {
        //location.pathname: 현재 url의 경로(path)부분을 문자열로 반환함.
        setIsSignInMode(false); 
        // 회원가입 모드
        } else if (location.pathname === "/login") {
        setIsSignInMode(true);  
        // 로그인 모드
        }
    }, [location.pathname, setIsSignInMode]);


    //쿼리 파라미터가 바뀌면 input 상태 리렌더
    useEffect(() => {
        setInput(query);
    }, [query]);


    //검색어 입력 변경 처리
    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);
        setSearchParams(val ? { query: val } : {});
        //쿼리 파라미터를 입력값으로 업데이트
    };

    //검색어 초기화 함수
    const clearSearch = () => {
        setInput('');
        setSearchParams({});
    };

    //로그아웃 함수
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (!error) {
            navigate("/"); 
            // 로그아웃 후 홈으로 이동
        } else {
            alert("로그아웃에 실패했습니다.");
        }
    };


    //모달창 바깥을 클릭했을 때 창 닫음.
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            //모달창이 존재하는지 = 띄워져있는지 확인 
            // => 요소가 조건부렌더링으로 숨겨지면 React에서 자동으로 current속성값을 null로 바꿈. 
            // && 클릭한 요소가 모달 안에 포함되지 않은 상태인지 확인
            setIsMenuOpen(false);
        }
        };
        if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    

    return (
    <div className="flex flex-col w-full ">
        <div className={`flex flex-row justify-between w-full h-[4em] items-center px-10  relative z-30 ${isDark ? "nav" : "light-nav"}`}>
            <nav>
                <Link
                    to="/"
                    className="text-[2em] font-bold text-white  logo"
                    onClick={() => {
                        clearSearch();
                        setPage(1);
                    }}
                >Hour</Link>
            </nav>
            <div className="flex flex-row gap-7 items-center">
                <div>
                    <input  
                        value={input}
                        onChange={handleChange}
                        className="border-b border-white text-white input"/>
                    <span
                        onClick={clearSearch}
                        className="inline-block transform rotate-[110deg] text-white font-extrabold text-[1.3em] cursor-pointer">☌</span>
                </div>
                {isLogined ? (<>
                {/*모달창*/}
                <div ref={menuRef} className="relative">
                    {/*클릭 이벤트가 있을 때 화면 전체에 버블링됨, 
                    contains()로 클릭된 대상이 모달 내부인지 판단함.*/}
                    <div className="flex gap-3 itmes-center"
                        onClick={() =>{
                            setIsMenuOpen((prev) => !prev)
                            console.log(user);
                            }}> 
                        {/* <span className="text-white cursor-pointer">{user.email.split("@")[0]}</span> */}
                        <span className="text-white cursor-pointer flex relative top-[0.2em] name">{user.user_metadata.name}</span>
                        {user.user_metadata.avatar_url ? 
                        <img src={user.user_metadata.avatar_url} 
                            className="w-[2.1875em] h-[2.1875em] cursor-pointer rounded-full object-cover" 
                        />
                        : <VscAccount
                        //아이콘
                        size={35}
                        color="white"
                        className="cursor-pointer"
                        />}
                    </div>

                    {isMenuOpen && (
                    <div
                        className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg z-10 p-2"
                    >
                        <Link
                        to="mypage"
                        className="block px-2 py-1 hover:bg-gray-700 rounded"
                        onClick={() => setIsMenuOpen(false)} // 클릭하면 모달 닫기
                        >
                        마이페이지
                        </Link>
                        <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
                        >
                        로그아웃
                        </button>
                    </div>
                    )}
                </div>
            </>) : (<>
                    <Link to="login" 
                    className="text-white login"
                    onClick={() => setIsSignInMode(true)}
                    >로그인</Link>
                    <Link to="signup" 
                    className="text-white signup"
                    onClick={() => setIsSignInMode(false)}
                    >회원가입</Link>
                    </>)}
            <span 
                className="text-white text-[1.5em] cursor-pointer hover:text-blue-300"
                onClick={()=> setIsDark((prev) => !prev)}
            >{isDark ? "☾" : "☼" }</span>
                
            </div>
        </div>

        <main>
            <Outlet />
            {/*여기가 진짜 내용임을 표시함.*/}
        </main>
    </div>)
}
