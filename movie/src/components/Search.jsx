import { Link, useSearchParams } from "react-router-dom";
import { getRegExp } from "korean-regexp";
import { useMovieStore } from "../store/movieStore";

export function Search() {
    const movies = useMovieStore( (state) => state.movies);
    const [searchParams] = useSearchParams();
    const param = searchParams.get("movie");
    const reg = param ? getRegExp(param, { initialSearch: true }) : null;
    const searchedMovie = (reg && movies )
        ? (movies.filter((el) => el.title?.match(reg))) : [];
    const imgUrl = "https://image.tmdb.org/t/p/w500";


    return (
        <div className="flex flex-wrap gap-6 p-4 justify-center my-5">
            {searchedMovie.length>0 ? searchedMovie.map( (mv) => (
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
                    
            )) : (<div className="text-white w-[10em] h-[5em]">영화 정보가 없습니다.</div>)}

        </div>
    );
}

export default Search;
