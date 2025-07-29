import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "../env";

const supabaseClient = createClient(supabaseEnv.projectURL, supabaseEnv.apiKey);

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
    return (
        <SupabaseContext.Provider value={supabaseClient}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) throw new Error("Supabase not initialized");
    return context;
};
