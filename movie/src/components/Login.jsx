import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../../supabase";
import { useUserContext } from "../context/UserContext";
import CommonInput from "./CommonInput";  

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  // 유효성 에러 메시지 상태
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const { login } = useSupabaseAuth();
  const { setUser } = useUserContext();

  const validate = () => {
    let isValid = true;

    // 이메일 간단 체크
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 비밀번호 체크 (빈 값 체크만 기본)
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return; // 유효성 검사 실패하면 로그인 안함

    try {
      const user = await login({ email, password });
      setUser(user);
      setMessage("로그인 성공");
      navigate("/");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <CommonInput
          label="이메일"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          error={emailError}
        />
        <CommonInput
          label="비밀번호"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          error={passwordError}
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
