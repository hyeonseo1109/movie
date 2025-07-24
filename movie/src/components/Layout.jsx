import { Outlet, Link } from "react-router-dom";
import { useSearch } from "../store/movieStore";
import { useNavigate } from "react-router-dom";

export function Layout() {
    const search = useSearch((state) => state.search);
    const setSearch = useSearch((state) => state.setSearch);
    const navigate = useNavigate()

    return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full h-[4em] items-center px-10 shadow-[0_0_10px_black] nav">
            <nav>
                <Link
                    to="/"
                    className="text-[2em] font-extrabold text-white tracking-[-5px]">Movie_Topia</Link>
            </nav>
            <div className="flex flex-row gap-7 items-center">
                <div>
                    <input  
                        value={search}
                        onChange={ (e) => setSearch(e.target.value)}
                        className="border-b border-white text-white"/>
                    <span
                        onClick={ () => {
                            navigate(`/search?movie=${search}`);
                            setSearch('');
                        }}
                        className="inline-block transform rotate-[110deg] text-white font-extrabold text-[1.3em]">☌</span>
                </div>
            </div>
        </div>

        <main>
            <Outlet />
            {/*여기가 진짜 내용임을 표시함.*/}
        </main>
    </div>)
}