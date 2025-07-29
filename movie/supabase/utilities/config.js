import { supabaseEnv } from "./env";

const projectURL = supabaseEnv && supabaseEnv.projectURL ? supabaseEnv.projectURL : "";
const domainPart = projectURL.split("//")[1] || "";
const prefix = domainPart.split(".")[0] || "";

export const USER_INFO_KEY = {
  sbKey: `sb-${prefix}-auth-token`,
  customKey: "userInfo",
};

export const DTO_TYPE = {
  user: "user",
  error: "error",
};
