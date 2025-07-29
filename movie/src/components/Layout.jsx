import { Outlet, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";


export function Layout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || '';
    const [input, setInput] = useState(query);

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

    return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full h-[4em] items-center px-10 shadow-[0_0_10px_black] nav">
            <nav>
                <Link
                    to="/"
                    className="text-[2em] font-extrabold text-white tracking-[-5px]"
                    onClick={clearSearch}               
                >Movie_Topia</Link>
            </nav>
            <div className="flex flex-row gap-7 items-center">
                <div>
                    <input  
                        value={input}
                        onChange={handleChange}
                        className="border-b border-white text-white input"/>
                    <span
                        onClick={clearSearch}
                        className="inline-block transform rotate-[110deg] text-white font-extrabold text-[1.3em]">☌</span>
                </div>
                <Link to="login" 
                    className="text-white">로그인</Link>
                <Link to="signup" 
                    className="text-white">회원가입</Link>
                <Link to="mypage" 
                    className="text-white">마이페이지</Link>
            </div>
        </div>

        <main>
            <Outlet />
            {/*여기가 진짜 내용임을 표시함.*/}
        </main>
    </div>)
}