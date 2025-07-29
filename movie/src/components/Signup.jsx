import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. 회원가입 시도 (이메일 인증 발송)
    const { _, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`에러: ${error.message}`);
      return;
    }

    // 2. 프로필 저장은 하지 않고, 이메일 인증 안내만
    setMessage(
      "회원가입 완료! 이메일을 확인하고 인증을 완료한 후 로그인 해주세요."
    );
  };

  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">회원가입</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 text-black rounded bg-white"
          required
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-2 text-black rounded bg-white"
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 text-black rounded bg-white"
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 text-black rounded bg-white"
          required
          minLength={6}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 rounded"
        >
          회원가입
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
