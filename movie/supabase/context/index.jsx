import { createContext, useContext } from "react";
import { supabaseEnv } from "../utilities/env";
import { createClient } from "@supabase/supabase-js";

// supabase 로그인 유지 세션 생성
const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);
console.log("Supabase URL:", supabaseEnv.projectURL);
console.log("Supabase API Key:", supabaseEnv.apiKey);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }
  return supabase;
};
