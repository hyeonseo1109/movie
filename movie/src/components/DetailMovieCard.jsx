import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/context";

export function DetailMovieCard() {
    const { id } = useParams();
    const detailMovies = useDetailMovieStore(state => state.detailMovies);
    const fetchDetailMovies = useDetailMovieStore(state => state.fetchDetailMovies);
    const navigate = useNavigate();
    const { isDark, user, likedMovieIds, removeLikedMovie, addLikedMovie } = useSupabase();

    useEffect(() => {
        fetchDetailMovies(id);
    }, [fetchDetailMovies, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!detailMovies || String(detailMovies.id) !== id) {
        console.log(id);
        return <div className={`${isDark ? "bg-black text-white " : "bg-white text-black"} shadow-[0_0_15px_#000000c1] flex flex-col  min-w-screen min-h-screen items-center py-20`}
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
        <div className={`${isDark ? "background" : "bg-white"}  min-h-screen`}>

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
                        {/* 수정: 배경이미지 div 수정, 절대위치 img + object-cover로 꽉 채우기 */}
                        <div className="relative w-full max-w-[50em] mx-auto aspect-[16/9] overflow-hidden">
                            {detailMovies.backdrop_path ? (
                                <img
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    alt="배경이미지"
                                    src={`https://image.tmdb.org/t/p/w500/${detailMovies.backdrop_path}`}
                                />
                            ) : <div className="absolute w-full h-full background"></div>}
                            <div
                                className="
                                    bg-[linear-gradient(180deg,rgb(0,0,0,0.05)1%,rgb(0,0,0,0.2)5%,rgb(0,0,0,0.3)10%,rgb(0,0,0,0.45)15%,rgb(0,0,0,0.75)50%,rgb(0,0,0,0.98)80%)]
                                    absolute bottom-0 left-0 w-full h-1/2 z-0
                                    "
                            ></div>

                            {/* 수정: tagline 위치 절대위치 유지하되 반응형 조정 */}
                            <span className="absolute top-[0.5em] right-[0.7em] max-w-[80%] text-[1.1em] sm:text-[1.4em] text-[#fff] break-keep text-right tagline text-shadow-[0_0_5px_black]">
                                {detailMovies?.tagline}
                            </span>

                            {/* 수정: poster와 텍스트 flex로 변경, marginChange 대신 padding으로 간격 조절 */}
                            <div className="relative z-10 flex flex-col sm:flex-row items-end gap-4 p-4 sm:pt-12">
                                {detailMovies.poster_path ? (
                                    <img
                                        alt="작은사진"
                                        className="aspect-[2/3] w-[6em] sm:w-[9em] shadow-[0_0_15px_black]"
                                        src={`https://image.tmdb.org/t/p/w500/${detailMovies.poster_path}`}
                                    />
                                ) : null}
                                <div className="flex flex-col gap-1 items-end text-white text-shadow-[0_0_5px_black] text-sm sm:text-base">
                                    {detailMovies.runtime !== 0 ? <span>상영시간: {detailMovies.runtime}분</span> : null}
                                    {detailMovies.vote_average !== 0 ? <span>★{detailMovies.vote_average}</span> : null}
                                    <span className="font-bold title text-lg sm:text-2xl">{detailMovies.title}</span>
                                </div>
                            </div>

                            <div className="p-3 leading-7 break-keep relative z-21 bg-black w-full">
                                {detailMovies.overview ? detailMovies.overview : <span>영화 설명이 없습니다.</span>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
