// import { useSupabase } from "../supabase/context";
import { useSupabase } from "../supabase/context";

export default function Logout() {
    const supabase = useSupabase();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded"
        >
            로그아웃
        </button>
    );
}
