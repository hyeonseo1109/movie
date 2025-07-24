import { useEffect } from "react";
import { useMovieStore } from "../store/movieStore"
import { Link } from "react-router-dom";

export function MovieCard () {
    const movies = useMovieStore( state => state.movies );
    const fetchMovies = useMovieStore( state => state.fetchMovies);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    useEffect( () => {
        fetchMovies();
    }, [fetchMovies]);

    return (
    <div className="flex flex-wrap gap-6 p-4 justify-center">
        
        {movies ? movies.map( (mv) => (
            <Link
                to={`/detail/${mv.id}`}
                key={mv.id} className="border bg-black shadow-[0_0_15px_#000000c1] box">
                <div className="w-[10em] h-[15em] relative overflow-hidden">
                    <img src={`${imgUrl}${mv.poster_path}`} />
                    <div className="bg-[#000000c1] text-white absolute w-full h-[3em] bottom-[0.5em] shadow-[0_-0.3em_0.3em_rgba(255,255,255,0.3),_0_0.3em_0.3em_rgba(255,255,255,0.3)] flex flex-col justify-center">
                        <p className="text-[20px] leading-[1]">{mv.title}</p>
                        <p className="text-[0.65em] flex justify-end mx-2 ">★{mv.vote_average}</p>
                    </div>
                </div>
            </Link>  
                
        )) : (<div>영화 정보가 없습니다.</div>)}
    </div>
    )
}