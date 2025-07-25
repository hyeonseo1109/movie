import { useEffect } from "react";
import { useMovieStore, useMode, usePage} from "../store/movieStore"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export function MovieCard () {
    const movies = useMovieStore( state => state.movies );
    const fetchMovies = useMovieStore( state => state.fetchMovies);
    const sortMode = useMode(state => state.sortMode);
    const setSortMode = useMode(state => state.setSortMode);

    const page = usePage(state => state.page);
    const setPage = usePage(state => state.setPage);


    const sortedMovies = [...movies];

    if (sortMode === 'vote') {
    sortedMovies.sort((a,b) => b.vote_average - a.vote_average);
    } else if (sortMode === 'recent') {
    sortedMovies.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortMode === 'popular') {
    sortedMovies.sort((a,b) => b.popularity - a.popularity);
    }


    const imgUrl = "https://image.tmdb.org/t/p/w500";


    useEffect( () => {
        fetchMovies(page);
    }, [fetchMovies, page]);

    

    return (
    <div>
            

        <div className="flex m-5 gap-5">
            <span
                onClick={() => setSortMode('vote')}
                className={`px-3 rounded-[0.4em] select-none
                ${sortMode === 'vote' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >별점순</span>
            <span
                onClick={() => setSortMode('recent')}
                className={`px-3 rounded-[0.4em] select-none
                ${sortMode === 'recent' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >최신순</span>
            <span 
                onClick={() => setSortMode('popular')}
                className={`px-3 rounded-[0.4em] select-none
                ${sortMode === 'popular' ? 'bg-[#ccc] text-black': 'bg-[#454545b9] text-white '}
                `}
            >인기순</span>
        </div>
        


            <Swiper
                modules={[Navigation, Scrollbar, Autoplay ]}
                spaceBetween={200}
                slidesPerView={5}
                navigation
                scrollbar={{ draggable: true }}
                centeredSlides={true}
                effect="cards"
                grabCursor={true} 
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false, 
                    //사용자가 컨트롤바로 이동시킨 후에도 자동전환 진행
                }}
                
            >
                
            {sortedMovies.slice(0, 5).map((mv, idx) => (
                <SwiperSlide
                    key={mv.id}
                    className="border bg-black shadow-[0_0_10px_#000000c1] box max-w-[10em] min-w-[10em] h-[15em] my-[3.7em]"
                >
                <Link
                    to={`/detail/${mv.id}`}
                    >
                    <div className="w-[10em] h-[15em] relative overflow-hidden flex">
                        <img src={`${imgUrl}${mv.poster_path}`} />
                        <div className="bg-[#000000c1] text-white absolute w-full h-[3em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-center">
                            <p className="text-[20px] leading-[1] flex justify-center text-center break-keep">{mv.title}</p>
                            {idx < 5 ?<p className="absolute bottom-[-0.5em] left-[0em] flex justify-start font-bold text-[2.5em] text-[#003dde]">{idx+1}</p> : <div></div>}
                            <div className="flex flex-row justify-end items-end ">
                                <p className="text-[0.65em] flex justify-end mx-2 ">★{mv.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </Link>  
                </SwiperSlide>
            ))}
            </Swiper>
        <div className="flex flex-wrap gap-6 p-4 justify-center my-5">
            {sortedMovies ? sortedMovies.slice(5).map( (mv) => (
                <Link
                    to={`/detail/${mv.id}`}
                    key={mv.id} className="border bg-black shadow-[0_0_15px_#000000c1] box">
                    <div className="w-[10em] h-[15em] relative overflow-hidden flex">
                        <img src={`${imgUrl}${mv.poster_path}`} />
                        <div className="bg-[#000000c1] text-white absolute w-full h-[3em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-center">
                            <p className="text-[20px] leading-[1] flex justify-center text-center break-keep">{mv.title}</p>
                            <div className="flex flex-row justify-end items-end ">
                                <p className="text-[0.65em] flex justify-end mx-2 ">★{mv.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </Link>  
                    
            )) : (<div>영화 정보가 없습니다.</div>)}
        </div>
        <div className="flex justify-center gap-4 my-[2em_10em]">
            <button 
                onClick={() => setPage(1)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">1</button>
            <button 
                onClick={() => setPage(2)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">2</button>
            <button 
                onClick={() => setPage(3)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">3</button>
            <button 
                onClick={() => setPage(4)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">4</button>
            <button 
                onClick={() => setPage(5)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">5</button>
            <button 
                onClick={() => setPage(6)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">6</button>
            <button 
                onClick={() => setPage(7)}
                className="flex bg-[gray] text-[1.3em] text-white font-bold w-[1.3em] h-[1.3em] items-center justify-center rounded-[0.3em]">7</button>
        </div>
    </div>
    )
}
