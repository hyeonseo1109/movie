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
                    {detailMovies.genres.map((gr) => <div className="text-[#999] shadow-[0_0_10px_rgb(255,255,255,0.]">#{gr.name}</div>)}
                </div>
                <div className="break-keep leading-8 tracking-tight text-left p-5 flex gap-5">
                    <img
                        className="aspect-[2/3] max-w-full h-auto"
                        src={`https://image.tmdb.org/t/p/w500/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg`} />
                    {detailMovies.overview}
                </div>
            </div>
    </div>
    )
}