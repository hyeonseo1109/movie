import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../../supabase/auth";
import { useSupabase } from "../../supabase"; 
import CommonInput from "./CommonInput";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const supabase = useSupabase(); // supabase 객체 얻기

  const validateUserName = (name) => /^[가-힣a-zA-Z0-9]{2,8}$/.test(name);
  const validatePassword = (pw) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(pw);
  const validatePhone = (phone) => /^\d{10,11}$/.test(phone);

  const validate = () => {
    let isValid = true;

    if (!validateUserName(userName)) {
      setUserNameError("2~8자 숫자, 한글, 영어만 사용 가능합니다.");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("비밀번호는 영어 대문자, 소문자, 숫자를 모두 포함해야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setPasswordConfirmError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError("전화번호는 10~11자리 숫자만 입력 가능합니다.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userInfo = await signUp({ email, password, userName });
      console.log("회원가입 userInfo:", userInfo);

      if (userInfo.user) {
        const { data, error } = await supabase.from("users").insert([
          {
            id: userInfo.user.id,
            name: userName,
            phoneNumber: phone,
          },
        ]);
        console.log("users insert data:", data);
        console.log("users insert error:", error);
        if (error) throw error;

        setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };


  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">회원가입</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
        <CommonInput
          label="이름"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
          required
          error={userNameError}
        />
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
          label="전화번호"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호"
          required
          error={phoneError}
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
        <CommonInput
          label="비밀번호 확인"
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
          required
          error={passwordConfirmError}
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
