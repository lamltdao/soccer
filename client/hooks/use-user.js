import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data.currentUser);

const useUser = () => {
  const { data, error } = useSWR("/api/auth/currentUser", fetcher);
  const user = data || null;
  return {
    user,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
