import { useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/context";

export default function Mypage() {
    const {isDark, user, isLoading } = useSupabase();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className={`${isDark ? "text-white background" : "text-black bg-white"} p-4 w-full min-h-screen`}>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={`${isDark ? "text-white background" : "text-black bg-white"} p-4 w-full min-h-screen`}>
                <p>회원 정보가 없습니다.</p>
            </div>
        );
    }


    const name = user.user_metadata?.name;
    const email = user.email;
    const date = user.created_at?.slice(0, 10);

    console.log("이메일:", email);
    console.log("이름:", name);
    console.log("가입날짜:", date);

    return (
        <div className={`${isDark ? "text-white background" : "text-black bg-white"} p-4 w-full min-h-screen flex justify-center items-center`}>
            <div 
                            onClick={() => navigate(-1)}
                            className={`${isDark ? "text-[#000000]" : "text-black"} font-bold text-[1.3em] p-3`}
                        >🅧</div>
            <div className={`${isDark ? "bg-[#00000050]" : "bg-[#dddddd50]"} shadow-[0_0_20px_#00000050] flex items-center justify-around flex-col w-[30em] h-[20em] rounded-2xl`}>
                <p>회원 정보</p>
                <div className="flex flex-col items-center h-[70%]">
                    <p className="text-[2em]">{name}님, 안녕하세요!</p>
                    <p>이메일: {email}</p>
                    <p>가입일: {date}</p>
                </div>
            </div>
        </div>
    );
}