import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data.currentUser);

const useUser = () => {
  // const { data, error } = useSWR("/api/auth/currentUser", fetcher);
  const data = {
    id: "123",
    name: "lam",
    email: "lam@gmail.com",
    username: "lamdao",
  };
  const error = null;
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
