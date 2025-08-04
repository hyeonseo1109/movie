import { useEffect, useState } from "react";
import { useMovieStore, useMode, usePage } from "../store/movieStore"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useDebounce } from "../useDebounce";
import { useSearchParams } from "react-router-dom";
import { useSupabase } from "../supabase/context";

export function MovieCard () {
    const movies = useMovieStore( state => state.movies );
    const fetchMovies = useMovieStore( state => state.fetchMovies);

    const sortMode = useMode(state => state.sortMode);
    const setSortMode = useMode(state => state.setSortMode);

    const page = usePage(state => state.page);
    const setPage = usePage(state => state.setPage);

    const searchedResults = useMovieStore(state => state.searchedResults);
    const fetchSearchedResults = useMovieStore(state => state.fetchSearchedResults);
    // 원래는 검색창 입력했을 때, 입력값 디바운스 씌우고 파람스로 입력값을 보내서 제목으로 결과를 찾았었는데
    // 이제 전역상태로 입력값을 관리하면서 디바운스된 입력값을 상태값에 저장하고 
    // 디바운스에 인자로 전역상태인 입력값을 넣고 
    // 결과 불러오는 fetchSearchedResults에서 검색하는 용도의 api 주소에 그 디바운스를 넣어서
    // 검색입력값이 있으면 저 fetchSearchedResults를 통해서 검색결과를 받아오고
    // 검색입력값이 없으면 그냥 fetchMovies에서 popular 영화 120개 보여주는 거.
    
    
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || '';
    const debounceQuery = useDebounce(query);

    useEffect(() => {
        if (debounceQuery) {
            fetchSearchedResults(debounceQuery, page);
        } else {
            fetchMovies(page, sortMode);
        }
    }, [debounceQuery, page, sortMode, fetchSearchedResults, fetchMovies]);


    useEffect(() => {
        if (debounceQuery) {
            setPage(1);
        }
    }, [debounceQuery]);


    const activeMovies = debounceQuery ? searchedResults : movies;


    const handleNextPage = async () => {
                    setPage(page + 1);
                }

    const handlePrevPage = async () => {
                    if (page > 1) setPage(page - 1);
                    else return alert('첫 번째 페이지입니다.');
                }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [page]);
    


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
    

    return (
    <div  className={`${isDark ? "background" : "light-background"}`}>
            
        { !debounceQuery &&
        <div className="flex m-0 p-5 gap-5">
            <span
                onClick={() => setSortMode('vote')}
                className={`px-3 rounded-[0.4em] select-none cursor-pointer hover:bg-gray-700
                ${sortMode === 'vote' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >별점순</span>
            <span
                onClick={() => setSortMode('recent')}
                className={`px-3 rounded-[0.4em] select-none cursor-pointer hover:bg-gray-700
                ${sortMode === 'recent' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >최신순</span>
            <span 
                onClick={() => setSortMode('popular')}
                className={`px-3 rounded-[0.4em] select-none cursor-pointer hover:bg-gray-700
                ${sortMode === 'popular' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >인기순</span>
        </div>
        }
        <div className={`w-full max-w-screen mx-auto px-4`}>
        { !debounceQuery && page === 1 && (
                <Swiper
                    modules={[Navigation, Scrollbar, Autoplay]}
                    navigation
                    scrollbar={{ draggable: true }}
                    centeredSlides={true}
                    grabCursor={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    // loop={true} 
                    observer={true}
                    observeParents={true}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 20 },
                        400: { slidesPerView: 2, spaceBetween: 60 },
                        700: { slidesPerView: 3, spaceBetween: 100 },
                        900: { slidesPerView: 4, spaceBetween: 200 },
                        1200: { slidesPerView: 5, spaceBetween: 300 },
                    }}
                    style={{ display: 'flex', justifyContent: 'center' }} 
                >
                    {activeMovies.slice(0, 5).map((mv) => (
                        <SwiperSlide key={mv.id} className="w-full flex justify-center items-center">
                            <Link to={`/detail/${mv.id}`}>
                                <div className={`w-[10em] h-[15em] relative overflow-hidden flex mx-auto rounded-[0.8em] m-10 ${isDark ? "shadow-[0_0_20px_black]" : "shadow-[0_0_20px_rgb(152,152,152)]"}`}>
                                    {mv.poster_path? <img src={`${imgUrl}${mv.poster_path}`} /> : <div className="w-full h-full background"></div>}
                                    <div className="bg-[#000000c1] text-white absolute w-full h-[4em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-around">
                                        <p className="text-[20px] leading-[1] flex justify-center text-center break-keep">{mv.title}</p>
                                        <div className="flex flex-row justify-between items-end">
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
                        </SwiperSlide>
                    ))}
                </Swiper>

        )}
        </div>
        <div className={`flex flex-wrap gap-7 p-3 justify-center ${!debounceQuery && "my-5"}`}>
            {activeMovies.length !== 0 ? activeMovies.map( (mv, idx) => (
                <Link
                    to={`/detail/${mv.id}`}
                    key={`${mv.id}-${idx}`} 
                    className=" bg-black shadow-[0_0_10px_#000000c1] box rounded-[0.8em]">
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
        <div className="flex justify-center gap-10 py-[2em_10em]">
            <button
                onClick={() => {handlePrevPage()}}
                
                className={`
                    flex justify-center items-center rounded 
                    h-6 w-6 text-2xl
                    hover:text-4xl
                    hover:font-bold
                    ${isDark ? "text-white" : " text-black"}
                `}
                >
                &lt;
            </button>
            <span className={`${isDark ? "text-white" : "text-black"}`}>{page}</span>
            <button
                onClick={()=>handleNextPage()}
                className={`
                    flex justify-center items-center rounded 
                    h-6 w-6 text-2xl
                    hover:text-4xl
                    hover:font-bold
                    ${isDark ? "text-white" : " text-black"}
                `}
                >
                &gt;
            </button>
        </div>
    </div>
    )
}
