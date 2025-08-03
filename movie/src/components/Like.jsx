import { useEffect } from "react";
import { useSupabase } from "../supabase/context";

import { Link } from "react-router-dom";
import { useLikedMovieStore } from "../store/movieStore";

export default function Like() {
    const { isDark, likedMovieIds, user, removeLikedMovie, addLikedMovie } = useSupabase();
    console.log("Like.jsx likedMovieIds:", likedMovieIds);
    const { likedMovies, setLikedMovies, fetchLikedMovies } = useLikedMovieStore();

    useEffect(() => {
        console.log("Like.jsx useEffect likedMovieIds changed:", likedMovieIds);
    }, [likedMovieIds]);

    const imgUrl = "https://image.tmdb.org/t/p/w500";

    // likedMovies가 바뀔 때마다 상세정보를 fetch
    useEffect(() => {
        if (!user || likedMovieIds.length === 0) {
            setLikedMovies([]); // 초기화
            return;
        }
        fetchLikedMovies(likedMovieIds);    
    }, [likedMovieIds, user]);


    const toggleLike = (movieId) => {
        if (!user) return alert("로그인 후 이용해주세요");

        if (likedMovieIds.includes(movieId)) {
            removeLikedMovie(user.id, movieId);
        } else {
            addLikedMovie(user.id, movieId);
        }
    };

    return (
        <div className={`${isDark ? "background text-white" : "bg-white text-black"} min-h-screen w-full py-4 px-6`}>
            <h2 className="text-xl font-bold mb-4">관심 있는 영화</h2>

            <div className="flex flex-wrap gap-6 justify-center">
                {likedMovies && likedMovies.length > 0 ? (
                    likedMovies.map((mv, idx) => (
                        <Link
                            to={`/detail/${mv.id}`}
                            key={`${mv.id}-${idx}`}
                            className="bg-black shadow-[0_0_15px_#000000c1] rounded-[0.8em]"
                        >
                            <div className="w-[10em] h-[15em] relative overflow-hidden flex rounded-[0.8em]">
                                {mv.poster_path ? (
                                    <img
                                        src={`${imgUrl}${mv.poster_path}`}
                                        alt={mv.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full background"></div>
                                )}
                                <div className="bg-[#000000c1] text-white absolute w-full h-[4em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-around">
                                    <p className="text-[20px] leading-[1] text-center break-keep">
                                        {mv.title}
                                    </p>
                                    <div className="flex flex-row justify-between items-end">
                                        <span
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleLike(mv.id);
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className="px-2"
                                        >
                                            {likedMovieIds && likedMovieIds.includes(mv.id) ? "♥" : "♡"}
                                        </span>
                                        <p className="text-[0.65em] px-2">★{mv.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-lg">관심 영화가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
