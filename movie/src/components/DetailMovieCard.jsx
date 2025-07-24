// import { useEffect } from "react";
// import { useDetailMovieStore } from "../store/movieStore"
// import { useParams } from "react-router-dom";

// export function DetailMovieCard () {
//     const {id} = useParams();
//     const detailMovies = useDetailMovieStore( state => state.detailMovies );
//     const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);

//     useEffect( () => {
//         fetchDetailMovies(id);
//     }, [fetchDetailMovies, id]);

//     if (!detailMovies || String(detailMovies.id) !== id) {
//         return <div>영화 정보가 없습니다.</div>;
//     }




//     return (
//     <div className="flex flex-wrap gap-4 p-4">
//             <div key={detailMovies.id} className="bg-black shadow-[0_0_15px_#000000c1] text-white">
//                 {detailMovies.overview}
//             </div>
//     </div>
//     )
// }

import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { useParams } from "react-router-dom";

export function DetailMovieCard () {
    const {id} = useParams();
    const detailMovies = useDetailMovieStore( state => state.detailMovies );
    const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);

    useEffect( () => {
        fetchDetailMovies();
    }, [fetchDetailMovies]);

    // 이거 지우면 쿵푸팬더 정보는 쿵푸팬더한테만 뜨게 할 수 있음. 
    // if (!detailMovies || String(detailMovies.id) !== id) {
    if (!detailMovies) {
        console.log(id);
        return <div>영화 정보가 없습니다.</div>;   
    }




    return (
    <div className="flex flex-wrap gap-4 p-4 mx-15 my-5">
            <div key={detailMovies.id} className="bg-black shadow-[0_0_15px_#000000c1] text-white detail">
                <div className="flex flex-row gap-4">
                    {detailMovies.genres.map((gr) => <div className="text-[#000] bg-[#555] rounded-[0.3em] text-[0.95em]">#{gr.name}</div>)}
                </div>
                <div>
                    <div className="relative w-[40em] mx-auto">
                        <img
                            className="w-[40em] h-auto"
                            alt="배경이미지"
                            src={`https://image.tmdb.org/t/p/w500/uDosHOFFWtF5YteBRygHALFqLw2.jpg`} />
                        <div 
                            className="
                            bg-[linear-gradient(180deg,rgb(255,255,255,0)10%,rgb(255,255,255,0.9))]
                            absolute top-[7.5em] left-0 w-full h-[15em]
                            "
                            alt="흰박스"
                        ></div>

                    </div>
                    <div className="break-keep leading-8 tracking-tight text-left p-5 flex gap-5">
                        <img
                            alt="작은사진"
                            className="aspect-[2/3] w-[10em] h-auto"
                            src={`https://image.tmdb.org/t/p/w500/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg`} />
                        {detailMovies.overview}
                    </div>

                </div>
            </div>
    </div>
    )
}