import { useState } from "react";
import { useSupabase } from "../supabase/context";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { supabaseClient, isLogined, user, isSignInMode } = useSupabase(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const validateInputs = () => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!isSignInMode && !nameRegex.test(name)) {
      return "이름은 2~8자의 한글, 영문, 숫자만 사용할 수 있습니다.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return "유효한 이메일 형식을 입력해주십시오.";
    }
    if (!passwordRegex.test(password)) {
      return "비밀번호는 영어 대소문자와 숫자를 포함해야 합니다.";
    }
    if (!isSignInMode && password !== confirmPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return null;
  };

  const signUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      if (error.message === "User already registered") {
        setError("이미 가입된 계정입니다.");
      } else {
        setError(error.message);
      }
    } else {
      setMessage("회원가입 성공! 로그인을 진행해주세요.");
    }
  };

  const signIn = async () => {
    setError(null);
    setMessage(null);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError("로그인에 실패했습니다.");
    else {
      setMessage("로그인 성공!");
      navigate("/");
    }
  };

  if (isLogined) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-xl text-white">
          안녕하세요, {user?.user_metadata?.name || user.email}님!
        </p>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto p-4">
      {!isSignInMode && (
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded bg-white"
        />
      )}
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded bg-white"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded bg-white"
      />
      {!isSignInMode && (
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded bg-white"
        />
      )}
      <div className="flex gap-2">
        {!isSignInMode ? (
          <button
            onClick={signUp}
            className="flex-1 bg-blue-600 text-white p-2 rounded"
          >
            회원가입
          </button>
        ) : (
          <button
            onClick={signIn}
            className="flex-1 bg-green-600 text-white p-2 rounded"
          >
            로그인
          </button>
        )}
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}