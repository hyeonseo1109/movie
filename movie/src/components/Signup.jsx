import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSupabase } from "../supabase/context";
// import { useSupabase } from "../../supabase/context";
import { useSupabase } from "../supabase/context";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const supabase = useSupabase();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (!data.user) {
      setError("회원가입 실패");
      return;
    }

    const { error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: data.user.id, name: userName }]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-80">
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="bg-white"
        required
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        className="bg-white"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        className="bg-white"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        회원가입
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}
