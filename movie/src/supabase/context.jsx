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
    //context의 provider 정의

    //children에게 내려줄 상태들
    const [isLogined, setIsLogined] = useState(false);
    const [user, setUser] = useState(null);
    // 현재 로그인된 유저 정보를 저장하는 state, 초기값은 null (유저 없음)
    const [isSignInMode, setIsSignInMode] = useState(true);
    const [isDark, setIsDark] = useState(true);

    // 첫 렌더링 시 로그인 상태 초기화
    useEffect(() => {

        // 페이지 새로고침 시 세션 유지하도록 현재 세션 정보를 받아옴
        const getSession = async () => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession();
            // supabaseClient.auth.getSession()으로 세션 데이터를 받아옴
            if (session?.user) {
                setIsLogined(true);
                setUser(session.user);
                
            }
        };
        getSession();
        // session 받아오는 함수 실행

        // 실시간 로그인/로그아웃 감지
        const { data: listener } = supabaseClient.auth.onAuthStateChange(
             // supabaseClient.auth.onAuthStateChange는 로그인/로그아웃 이벤트를 감지?함
            (event, session) => {
                if (session?.user) {
                    //유저 상태가 있으면
                    setIsLogined(true);
                    setUser(session.user);
                } else {
                    setIsLogined(false);
                    setUser(null);
                }
            }
        );

        return () => listener?.subscription.unsubscribe();
        // 컴포넌트 언마운트 시 이벤트 구독 해제(cleanup)

    }, []);
    // 의존성 배열이 비어있음 = 최초 마운트 시 1번만 실행됨.
    // 로그인 상태 변화는 onAuthStateChange에서 관리하므로 별도의 의존성배열 넣을 필요 없음.


    console.log(`로그인상태:`, isLogined);
    console.log('유저정보:', user)

    return (
        <SupabaseContext.Provider value={{supabaseClient, isLogined, user, isSignInMode, setIsSignInMode, isDark, setIsDark}}>
        {/*이 컴포넌트 내부에서 useSupabse()를 호출하면
        value인 supabaseClient, isLogined, user... 를 받아옴.*/}
            {children}
            {/*하위 컴포넌트들 렌더링*/}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    // useContext 훅으로 SupabaseContext의 값을 가져옴.
    //context는 provider에서 준 값인 supabaseClient, isLogined, user, isSignInMode, setIsSignInMode, isDark, setIsDark가 됨.
    return context;
};
