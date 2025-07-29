import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("로그인 성공");
      navigate("/");
    }
  };

  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 text-black rounded bg-white"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 text-black rounded bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 rounded"
        >
          로그인
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
