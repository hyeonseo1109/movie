import { useState } from "react";
import { useSupabase } from "../supabase/context";
import { redirect, useNavigate } from "react-router-dom";

export default function Auth() {
  const { supabaseClient, isSignInMode, isDark, setUser } = useSupabase(); 
  //contextAPI로 생성한 supabase와 관련된 전역상태들 가져오기
  const navigate = useNavigate();

  //사용자 입력 상태 관리하기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  //유효성 검사
  const validateInputs = () => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    // 한글 / 영문 / 숫자 => 2~8자 허용
    // ^: 문자열의 시작(부터 검사하겠다)
    // $: 문자열의 끝
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    // 알파벳 대문자 또는 소문자, 숫자 => 6자 이상
    // (?=.*[a-zA-Z]) : 알파벳이 하나 이상 포함되어야 함
    // (?=.*\d) : 숫자가 하나 이상 포함되어야 함 = (?=.*[0-9] )
    // [A-Za-z\d]{6,} : 알파벳 또는 숫자로 된 문자가 6자 이상이어야 함

    // \D: 숫자가 아닌 것
    // \s: 공백 문자
    // \S: 공백이 아닌 문자

    if (!isSignInMode && !nameRegex.test(name)) {
      //로그인모드가 아닐 때,  name이 정규식 조건에 맞지 않을 때 
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

  //회원가입 함수
  const signUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { error } = await supabaseClient.auth.signUp({
      // Supabase auth API 호출 - 회원가입
      email,
      password,
      options: { data: { name } },
      // options.data에 name을 넣어 사용자 메타데이터로 저장
    });
    if (error) {
      if (error.message === "User already registered") {
        setError("이미 가입된 계정입니다.");
      } else {
        setError(error.message);
      }
    } else {
      setMessage("회원가입 되었습니다. 환영해요!");
        setError("");
    }
  };

  // 로그인 함수
  const signIn = async () => {
    setError(null);
    setMessage(null);
    // Supabase 로그인 API 호출 (비밀번호/이메일이 일치하는지 확인함)
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    //POST 요청으로 이메일과 패스워드만 보냄
    if (error) setError("로그인에 실패했습니다.");
    else {
      setMessage("로그인 성공!");
      setError("");
      navigate("/");
      setUser(data.user);
      //로그인 성공 시 메인화면으로 이동
    }
  };

  //카카오톡 로그인
  const signInWithKakao = async () => {
    setError(null);
    setMessage(null);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        scopes: "profile_nickname",
        redirectTo: "https://movies-12-zeta.vercel.app/",
      },
    });

    if (error) {
      setError("카카오 로그인에 실패했습니다.");
      console.error(error);
    console.log("카카오 로그인 사용자 메타데이터:", data.user.user_metadata);

    }
    const nickname = data.user.user_metadata?.profile_nickname;

    setMessage(`카카오 로그인 성공! 닉네임: ${nickname}`);
    console.log("카카오 로그인 사용자 메타데이터:", data.user.user_metadata);


    setUser(data.user);
    navigate("/");

  };

  const signInWithGoogle = async () => {
    setError(null);
    setMessage(null);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "profile email",
        redirectTo: "https://movies-12-zeta.vercel.app/",
      },
    });
    if (error) {
      setError("구글 로그인에 실패했습니다.");
      console.error(error);
      return;
    }
    const nickname = data.user.user_metadata?.name;

    setMessage(`구글 로그인 성공! 닉네임: ${nickname}`);
    console.log("구글 로그인 사용자 메타데이터:", data.user.user_metadata);

    setUser(data.user);
    navigate("/");

  };


  return (
    <div className={`${isDark ? "background" : "bg-white" } w-full min-h-screen`}>
      <div className="flex flex-col gap-3 max-w-sm mx-auto py-30 px-5 ">
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
              className="flex-1 bg-[#5880a2] text-white p-2 rounded"
            >
              회원가입
            </button>
          ) : (
            <button
              onClick={signIn}
              className="flex-1 bg-[#5880a2] text-white p-2 rounded"
            >
              로그인
            </button>
          )}
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <br/>
        <button
          onClick={signInWithKakao}
          className="mt-4 bg-yellow-400 text-[#412b24] p-2 rounded flex justify-center items-center"
        >
          카카오 로그인
        </button>
        <button
          onClick={signInWithGoogle}
          className="mt-4 bg-blue-600 text-white p-2 rounded flex justify-center items-center"
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
}