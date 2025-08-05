
import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/context";

export function DetailMovieCard () {
    const {id} = useParams();
    const detailMovies = useDetailMovieStore( state => state.detailMovies );
    const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);
    const navigate = useNavigate();
    const {isDark, user, likedMovieIds, removeLikedMovie, addLikedMovie} = useSupabase();

    useEffect( () => {
        fetchDetailMovies(id);
    }, [fetchDetailMovies, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    

    if (!detailMovies || String(detailMovies.id) !== id ) {
        console.log(id);
        return <div className={`${ isDark ? "bg-black text-white " : "bg-white text-black"} shadow-[0_0_15px_#000000c1] flex flex-col  min-w-screen min-h-screen items-center py-20`}
        >로딩 중...</div>;   
    }

    const toggleLike = (movieId) => {
        if (!user) return alert("로그인 후 이용해주세요");

        if (likedMovieIds.includes(movieId)) {
            removeLikedMovie(user.id, movieId);
        } else {
            addLikedMovie(user.id, movieId);
        }
    };

    console.log(detailMovies.genres);

    return (
        <div className={`${isDark ? "background" : "bg-white" }  min-h-screen`}>
            
            <div className="flex flex-wrap gap-4 p-4  py-5 justify-center realDetail w-full">
                    <div key={detailMovies.id} className={`${isDark ? "bg-black" : "bg-[#ccc]"} shadow-[0_0_15px_#000000c1] text-white flex flex-col detailCard w-full rounded-2xl`}>
                        <div className="flex justify-between">
                            <div 
                                onClick={() => navigate(-1)}
                                className={`${isDark ? "text-[gray]" : "text-white"} font-bold text-[1.3em] p-3`}
                            >🅧</div>
                            <span
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        // 링크 이동 막기
                                        toggleLike(detailMovies.id);
                                    }}
                                    className={`${isDark ? "text-white" : "text-blue-600"} text-[1.5em] p-3`}
                                    style={{ cursor: "pointer" }}
                            >
                                {likedMovieIds && likedMovieIds.includes(detailMovies.id) ? "♥︎" : "♡"}
                            </span>
                        </div>
                        <div className="flex flex-row gap-6 m-4 justify-center">
                            {detailMovies.genres.map((gr) => <Link 
                                to={`${gr.id}`}
                                key={gr.id}
                                className={`${isDark ? "text-[#fff]" : "text-black"} text-[0.95em] p-0.5 border-b border-[#bfbfbf]`}
                                    >#{gr?.name}</Link>)}
                        </div>
                        <div className="w-full">
                            {/* <div className="relative w-[50em] mx-auto"> */}
                            <div className="relative w-full max-w-[50em] mx-auto aspect-[16/9] overflow-hidden">
                                {detailMovies.backdrop_path ? (<img
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    alt="배경이미지"
                                    src={`https://image.tmdb.org/t/p/w500/${detailMovies.backdrop_path}`} />) : <div className="absolute w-full h-full background"></div>}
                                <div 
                                    className="
                                        bg-[linear-gradient(180deg,rgb(0,0,0,0.05)1%,rgb(0,0,0,0.2)5%,rgb(0,0,0,0.3)10%,rgb(0,0,0,0.45)15%,rgb(0,0,0,0.75)50%,rgb(0,0,0,0.98)80%)]
                                        absolute bottom-0 left-0 w-full h-1/2 z-10
                                        "
                                ></div>
                                <span className="absolute top-[0.5em] right-[0.7em] text-[1.4em] text-[#fff] max-w-[25em] break-keep text-right tagline text-shadow-[0_0_5px_black]">{detailMovies?.tagline}</span>
                                

                                <div className="flex items-end px-6 mt-1.5 gap-4 z-20 relative justify-between">
                                    {detailMovies.poster_path? <img
                                        alt="작은사진"
                                        className="aspect-[2/3] w-[9em] m-2 h-auto shadow-[0_0_15px_black]"
                                        src={`https://image.tmdb.org/t/p/w500/${detailMovies.poster_path}`} /> : null}
                                    <div  className="flex flex-col gap-1 items-end text-white text-shadow-[0_0_5px_black]">
                                        {/* <span className="text-[1em] text-white">상영시간: {detailMovies.runtime}분</span> */}
                                        {detailMovies.runtime!==0 ? <span className="text-[1em] text-white text-shadow-[0_0_5px_black]">상영시간: {detailMovies.runtime}분</span> : null }
                                        {detailMovies.vote_average!==0 ? <span className="text-[1em] text-white text-shadow-[0_0_5px_black]">★{detailMovies.vote_average}</span> : null }
                                        <span className="font-bold title text-shadow-[0_0_5px_black]">{detailMovies.title}</span>
                                    </div>
                                </div>

                            </div>
                                <div className="px-3 leading-7 whitespace-pre-wrap relative bottom-1 z-20 bg-black w-full">
                                    {detailMovies.overview ? detailMovies.overview : <span>영화 설명이 없습니다.</span>}
                                </div>

                        </div>
                    </div>
            </div>
        
        </div>
    )
}