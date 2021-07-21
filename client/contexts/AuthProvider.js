import { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data.currentUser);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data } = useSWR("/api/auth/currentUser", fetcher);
  const user = data || null;

  const login = async ({ email, password }) => {
    return axios.post({
      url: "/api/auth/login",
      body: {
        email,
        password,
      },
    });
  };

  const signup = async ({ email, password, name, username }) => {
    return axios.post({
      url: "/api/auth/signup",
      body: {
        email,
        password,
        name,
        username,
      },
    });
  };

  const signout = async () => {
    return axios.delete({
      url: "/api/auth/logout",
    });
  };

  const value = {
    user,
    login,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
