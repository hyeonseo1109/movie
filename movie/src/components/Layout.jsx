import { Outlet, Link, useSearchParams } from "react-router-dom";


export function Layout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("query") || '';

    const setSearch = (value) => {
        console.log('setSearch:', value);
        setSearchParams(value ? { query: value } : {});
    };


    return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full h-[4em] items-center px-10 shadow-[0_0_10px_black] nav">
            <nav>
                <Link
                    to="/"
                    className="text-[2em] font-extrabold text-white tracking-[-5px]"
                    onClick={() => setSearch('')}                
                >Movie_Topia</Link>
            </nav>
            <div className="flex flex-row gap-7 items-center">
                <div>
                    <input  
                        value={search}
                        onChange={ (e) => setSearch(e.target.value)}
                        className="border-b border-white text-white input"/>
                    <span
                        onClick={ () => setSearch("")}
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