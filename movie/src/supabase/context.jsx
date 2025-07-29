import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "../env";
import { useEffect, useState } from "react";

const supabaseClient = createClient(supabaseEnv.projectURL, supabaseEnv.apiKey);
//supabase의 함수인 createClient를 통해 
//supabse와 연결되는 새 객체(supabaseClient라는 이름)를 만들겠다. 

const SupabaseContext = createContext(null);
//전역상태 설정

export const SupabaseProvider = ({ children }) => {
    const [isLogined, setIsLogined] = useState(false);
    const [user, setUser] = useState(null);
    const [isSignInMode, setIsSignInMode] = useState(true);

    // 로그인 상태 초기화
    useEffect(() => {
        // 페이지 새로고침 시 세션 유지
        const getSession = async () => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession();
            if (session?.user) {
                setIsLogined(true);
                setUser(session.user);
                
            }
        };
        getSession();

        // 실시간 로그인/로그아웃 감지
        const { data: listener } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                if (session?.user) {
                    setIsLogined(true);
                    setUser(session.user);
                } else {
                    setIsLogined(false);
                    setUser(null);
                }
            }
        );

        return () => listener?.subscription.unsubscribe();
    }, []);
    //isLogined / user는 Supabase의 onAuthStateChange로 관리되므로 의존성배열에 넣지 않아도 됨.
    //최초 실행에서 이벤트리스너 만들기만 하면 됨
    console.log(`로그인상태:`, isLogined);
    console.log('유저정보:', user)

    return (
        <SupabaseContext.Provider value={{supabaseClient, isLogined, user, isSignInMode, setIsSignInMode}}>
        {/*이 컴포넌트 내부에서 useSupabse()를 호출하면
        value인 supabaseClient, isLogined, user 를 받아옴.*/}
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    //context는 provider에서 준 값인 supabaseClient, isLogined, user, isSignInMode, setIsSignInMode가 됨.
    if (!context) throw new Error("Supabase Provider가 설정되지 않았습니다.");
    return context;
};
