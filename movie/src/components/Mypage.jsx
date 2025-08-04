import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/context";
import { VscAccount } from "react-icons/vsc";

export default function Mypage() {
    const {isDark, user, isLoading } = useSupabase();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className={`${isDark ? "text-white background" : "text-black bg-white"} p-4 w-full min-h-screen flex justify-center py-20`}>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={`${isDark ? "text-white background" : "text-black bg-white"} p-4 w-full min-h-screen flex justify-center py-20`}>
                <p>회원 정보가 없습니다.</p>
            </div>
        );
    }


    const name = user.user_metadata.name;
    const email = user.email;
    const date = user.created_at?.slice(0, 10);

    console.log("이메일:", email);
    console.log("이름:", name);
    console.log("가입날짜:", date);

    return (
        <div className={`${isDark ? "text-white background" : "text-black bg-white"} px-2 py-20 w-full min-h-screen flex justify-center items-start`}>
            
            <div className={`${isDark ? "bg-[#00000050]" : "bg-[#dddddd50]"} shadow-[0_0_20px_#00000050] flex items-center justify-around flex-col w-[35em] h-[25em] rounded-2xl relative`}>
                <div 
                    onClick={() => navigate(-1)}
                    className={`${isDark ? "text-white" : "text-black"} font-bold text-[1.3em] p-3 absolute top-0 left-0`}
                >🅧</div>
                <div className="flex flex-col items-center h-[70%] gap-5">
                    { user.user_metadata.avatar_url ? 
                    <img src={user.user_metadata.avatar_url}
                        className="w-[5em] h-[5em] rounded-full object-cover" />
                        // object-cover : 이미지 비율 유지하면서 넘치는 부분은 잘리게
                    : <VscAccount
                        size={80}
                        color="white"
                        className="cursor-pointer"
                        />}
                    <p className="text-[2em]">{name}님, 안녕하세요!</p>
                    <div className="flex flex-col items-center">
                        <p>이메일: {email}</p>
                        <p>가입일: {date}</p>
                    </div>
                </div>
                <Link to="like"
                    className="hover:text-blue-600"><u>관심 있는 영화</u></Link>
            </div>
        </div>
    );
}