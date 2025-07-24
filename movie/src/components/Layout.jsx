import { Outlet, Link } from "react-router-dom";

export function Layout() {
    return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full h-[4em] items-center px-3 nav">
            <div>
                {/* <p className="text-[1.5em]">𝙊𝙣𝙏𝙝𝙚𝙎𝙤𝙛𝙖</p> */}
                <p className="text-[2em] font-bold">Cinema</p>
            </div>
            <nav>
                <Link 
                    className="text-white flex"
                    to="/">메인</Link>
            </nav>
        </div>

        <main>
            <Outlet />
            {/*여기가 진짜 내용임을 표시함.*/}
        </main>
    </div>)
}