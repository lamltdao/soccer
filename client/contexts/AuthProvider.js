import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import axios from "axios";
import useSWR from "swr";
import { useSnackbar } from "notistack";

const fetcher = (url) => axios.get(url).then((res) => res.data.currentUser);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, error } = useSWR("/api/auth/currentUser", fetcher);
  const user = error ? null : data;
  const [errors, setErrors] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const toArray = (value) => {
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  };

  useEffect(() => {
    if (!errors) return;
    errors.map((err) => {
      return enqueueSnackbar(err);
    });
  }, [errors]);

  const login = async ({ email, password }) => {
    return axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setErrors(toArray(err.response.data.message));
      });
  };

  const signup = async ({ email, password, name, username }) => {
    return axios
      .post("/api/auth/signup", {
        email,
        password,
        name,
        username,
      })
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        setErrors(toArray(err.response.data.message));
      });
  };

  const signout = async () => {
    return axios
      .delete("/api/auth/logout")
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        setErrors(toArray(err.response.data.message));
      });
  };

  const value = {
    user,
    errors,
    login,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
