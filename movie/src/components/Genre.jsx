import { Link, useParams } from "react-router-dom"
import { useRecommendedMovie } from "../store/movieStore";
import { useEffect } from "react";
import { useSupabase } from "../supabase/context";

export function Genre () {
    const { genreId } = useParams();
    const { recommendedMovie, fetchRecommendedMovie} = useRecommendedMovie();

    useEffect(() => {
        fetchRecommendedMovie(genreId);
    }, [genreId]);

    const imgUrl = "https://image.tmdb.org/t/p/w500";

    const {isDark, user, likedMovieIds, addLikedMovie, removeLikedMovie} = useSupabase();
    
        const toggleLike = (movieId) => {
            if (!user) return alert("로그인 후 이용해주세요");
    
            if (likedMovieIds.includes(movieId)) {
                removeLikedMovie(user.id, movieId);
            } else {
                addLikedMovie(user.id, movieId);
            }
        };
        
    const allGenre = {
        28: "액션",
        12: "모험",
        16: "애니메이션",
        35: "코미디",
        80: "범죄",
        99: "다큐멘터리",
        18: "드라마",
        10751: "가족",
        14: "판타지",
        36: "역사",
        27: "공포",
        10402: "음악",
        9648: "미스터리",
        10749: "로맨스",
        878: "SF",
        10770: "TV 영화",
        53: "스릴러",
        10752: "전쟁",
        37: "서부"
    };
    const genreName = allGenre[genreId];

    return (<>
        <div className={`flex flex-wrap flex-col gap-7 py-15 px-5 justify-start items-center w-full min-h-screen ${isDark ? "background" : "bg-white" }`}>
            <p className={`${isDark ? "text-white" : "text-black" } text-center text-[1.5em]`}>{genreName} 장르를 좋아하신다면, <br/> 마음에 들어 할 영화!</p>
            <div className="flex gap-10 flex-wrap justify-center">
                {recommendedMovie?.length !== 0 ? recommendedMovie?.map( (mv, idx) => (
                    <Link
                        to={`/detail/${mv.id}`}
                        key={`${mv.id}-${idx}`} 
                        className=" bg-black shadow-[0_0_10px_#000000c1] box rounded-[0.8em] w-[10em] h-[15em]">
                        <div className="w-[10em] h-[15em] relative overflow-hidden flex rounded-[0.8em]">
                            {mv.poster_path? <img src={`${imgUrl}${mv.poster_path}`} /> : <div className="w-full h-full background"></div>}
                            <div className="bg-[#000000c1] text-white absolute w-full h-[4em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-around">
                                <p className="text-[20px] leading-[1] flex justify-center text-center break-keep">{mv.title}</p>
                                <div className="flex flex-row justify-between items-end ">
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            // 링크 이동 막기
                                            toggleLike(mv.id);
                                        }}
                                        style={{ cursor: "pointer" }}
                                        className="px-2"
                                    >
                                        {likedMovieIds.includes(mv.id) ? "♥︎" : "♡"}
                                    </span>
                                    <p className="text-[0.65em] flex justify-end px-2 ">★{mv.vote_average}</p>
                                </div>
                            </div>
                        </div>
                    </Link>  
                        
                // )) : ( <div className="text-center text-white text-lg">검색 결과가 없습니다.</div>)}
                )) : ( <div className={`${isDark ? "background text-white" : "bg-white text-black"} text-center  text-lg w-full flex justify-center min-h-screen `}>로딩 중...</div>)}


            </div>
            <p className={`${isDark ? "text-white" : "text-black" } text-center text-[1em] cursor-pointer hover:text-blue-600`}
                onClick={() => fetchRecommendedMovie(genreId)}
            >더 보기
            </p>
        </div>
    </>)
}