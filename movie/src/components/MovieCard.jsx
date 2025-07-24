import { useEffect } from "react";
import { useMovieStore, useMode} from "../store/movieStore"
import { Link } from "react-router-dom";

export function MovieCard () {
    const movies = useMovieStore( state => state.movies );
    const fetchMovies = useMovieStore( state => state.fetchMovies);
    // const isVote = useVote( state => state.isVote);
    // const setIsVote = useVote( state => state.setIsVote);

    // const isRecent= useVote( state => state.isRecent);
    // const setIsRecent= useVote( state => state.setIsRecent);

    // const isPopular= useVote( state => state.isPopular);
    // const setIsPopular= useVote( state => state.setIsPopular);
    const sortMode = useMode(state => state.sortMode);
    const setSortMode = useMode(state => state.setSortMode);

    const sortedMovies = [...movies];

    // if(isVote) {
    //     sortedMovies.sort((a,b) => b.vote_average - a.vote_average);
    // } else if (isRecent) {
    //     sortedMovies.sort( (a,b) => new Date(b.release_date) - new Date(a.release_date))
    // } else if (isPopular) { 
    //     sortedMovies.sort( (a,b) => b.popularity - a.popularity);
    // }
    if (sortMode === 'vote') {
    sortedMovies.sort((a,b) => b.vote_average - a.vote_average);
    } else if (sortMode === 'recent') {
    sortedMovies.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortMode === 'popular') {
    sortedMovies.sort((a,b) => b.popularity - a.popularity);
    }


    const imgUrl = "https://image.tmdb.org/t/p/w500";


    useEffect( () => {
        fetchMovies();
    }, [fetchMovies]);

    

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
        <div className="flex flex-wrap gap-6 p-4 justify-center my-5">
            {sortedMovies ? sortedMovies.map( (mv, idx) => (
                <Link
                    to={`/detail/${mv.id}`}
                    key={mv.id} className="border bg-black shadow-[0_0_15px_#000000c1] box">
                    <div className="w-[10em] h-[15em] relative overflow-hidden flex">
                        <img src={`${imgUrl}${mv.poster_path}`} />
                        <div className="bg-[#000000c1] text-white absolute w-full h-[3em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-center">
                            <p className="text-[20px] leading-[1] flex justify-center text-center break-keep">{mv.title}</p>
                            {idx < 3 ?<p className="absolute bottom-[-0.5em] left-[0em] flex justify-start text-shadow-[0_0_8px_white] font-bold text-[2.5em] text-[#003dde]">{idx+1}</p> : <div></div>}
                            <div className="flex flex-row justify-end items-end ">
                                <p className="text-[0.65em] flex justify-end mx-2 ">★{mv.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </Link>  
                    
            )) : (<div>영화 정보가 없습니다.</div>)}

        </div>
    </div>
    )
}
