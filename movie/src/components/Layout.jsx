import { Outlet, Link } from "react-router-dom";
import { useSearch, useNavigate } from "../store/movieStore";

export function Layout() {
    const search = useSearch((state) => state.search);
    const setSearch = useSearch((state) => state.setSearch);
    const navigate = useNavigate()

    return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full h-[4em] items-center px-10 shadow-[0_0_10px_black] nav">
            <div>
                {/* <p className="text-[1.5em]">𝙊𝙣𝙏𝙝𝙚𝙎𝙤𝙛𝙖</p> */}
                <p className="text-[2em] font-extrabold text-white tracking-[-5px]">MovieTopia</p>
            </div>
            <div className="flex flex-row gap-7">
                <div>
                    <input  
                        onChange={ (e) => setSearch(e)}
                        className="border-b border-white"/>
                    <span
                        onClick={ () => navigate(`/serch?movie=${search}`)}
                        className="inline-block transform rotate-[110deg] text-white font-extrabold">☌</span>
                </div>
                <nav>
                    <Link 
                        className="text-white flex"
                        to="/">메인</Link>
                </nav>
            </div>
        </div>

        <main>
            <Outlet />
            {/*여기가 진짜 내용임을 표시함.*/}
        </main>
    </div>)
}