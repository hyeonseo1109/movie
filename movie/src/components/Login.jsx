import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSupabase } from "../supabase/context";
// import { useSupabase } from "../../supabase/context";
import { useSupabase } from "../supabase/context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const supabase = useSupabase();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/"); // 로그인 후 홈으로 이동
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 w-80">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        로그인
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
