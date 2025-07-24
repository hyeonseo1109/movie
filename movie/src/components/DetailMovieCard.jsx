
import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function DetailMovieCard () {
    const {id} = useParams();
    const detailMovies = useDetailMovieStore( state => state.detailMovies );
    const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);
    const navigate = useNavigate();

    useEffect( () => {
        fetchDetailMovies(1011985);
    }, [fetchDetailMovies]);
    //나중에 id로 숫자 넘기는 거 바꾸기
    //지금은 어떤 영화를 눌러도 다 쿵푸팬더가 떠야 되니까 쿵푸팬더 아이디를 넘김

    // 이거 지우면 쿵푸팬더 정보는 쿵푸팬더한테만 뜨게 할 수 있음. 
    // if (!detailMovies || String(detailMovies.id) !== id) {
    if (!detailMovies) {
        console.log(id);
        return <div>영화 정보가 없습니다.</div>;   
    }




    return (
    <div className="flex flex-wrap gap-4 p-4 mx-5 my-5 justify-center">
            <div key={detailMovies.id} className="bg-black shadow-[0_0_15px_#000000c1] text-white flex flex-col  detail ">
                <div 
                    onClick={() => navigate(-1)}
                    className="font-bold text-[gray] text-[1.3em]"
                >🅧</div>
                <div className="flex flex-row gap-6 m-4 justify-end">
                    {detailMovies.genres.map((gr) => <div className="text-[#fff] text-[0.95em] p-0.5 border-b border-[#bfbfbf]">#{gr.name}</div>)}
                </div>
                <div>
                    <div className="relative w-[40em] mx-auto">
                        <img
                            className="w-[40em] h-auto"
                            alt="배경이미지"
                            src={`https://image.tmdb.org/t/p/w500/uDosHOFFWtF5YteBRygHALFqLw2.jpg`} />
                        <div 
                            className="
                            bg-[linear-gradient(180deg,rgb(0,0,0,0)1%,rgb(0,0,0,0.2)10%,rgb(0,0,0,0.55)30%,rgb(0,0,0,0.75)50%,rgb(0,0,0,0.98)80%)]
                            absolute top-[7.5em] left-0 w-full h-[15em]
                            "
                            alt="흰박스"
                        ></div>

                        <img
                            alt="작은사진"
                            className="aspect-[2/3] w-[9em] h-auto absolute top-[7em] left-[1em] shadow-[0_0_15px_black]"
                            src={`https://image.tmdb.org/t/p/w500/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg`} />
                    </div>
                    <div className="break-keep leading-8 tracking-tight text-left p-5 flex gap-5
                    bg-[gray] w-[30em]
                    ">
                        {detailMovies.overview}
                    </div>

                </div>
            </div>
    </div>
    )
}