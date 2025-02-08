import { createContext } from "react";

// 1. Create the Context
export const AuthContext = createContext({
    token: null,
    userId: null,
    name: null,
    login: () => {},
    logout: () => {}
  });