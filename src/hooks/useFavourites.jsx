import { useEffect, useRef } from "react";
import UserDetailContext from "../context/userDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";
import { useContext } from "react";
import { useQuery } from "react-query";


const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => user ? getAllFav(user.email) : Promise.resolve(null),
    onSuccess: (data) => data && setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};


export default useFavourites;


// orignal function
// const useFavourites = () => {
//   const { userDetails, setUserDetails } = useContext(UserDetailContext);
//   const queryRef = useRef();
//   const { user } = useAuth0();

//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: "allFavourites",
//     queryFn: () => getAllFav(user?.email),
//     onSuccess: (data) =>
//       setUserDetails((prev) => ({ ...prev, favourites: data })),
//     enabled: user !== undefined,
//     staleTime: 30000,
//   });

//   queryRef.current = refetch;

//   useEffect(() => {
//     queryRef.current && queryRef.current();
//   }, [userDetails?.token]);

//   return { data, isError, isLoading, refetch };
// };