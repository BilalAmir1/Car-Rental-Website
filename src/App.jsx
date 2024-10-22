import Layout from "./components/Layout/Layout";
import React, { Suspense, useState } from "react";
import {QueryClient, QueryClientProvider} from "react-query"
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UserDetailContext from "./context/userDetailContext";




function App() {
  const queryClient = new QueryClient()

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null
  })

  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
    <QueryClientProvider client={queryClient}>
      
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
    <Layout />
    </Router>
    </Suspense>

  <ReactQueryDevtools initialIsOpen={false} />
  <ToastContainer/>
  </QueryClientProvider>
  </UserDetailContext.Provider>
  );
}

export default App;
