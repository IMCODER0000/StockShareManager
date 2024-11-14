import React from "react";
import { useRoutes } from "react-router-dom";
import StartPage from "./StartPage";
import MainPage from "./MainPage";
import Login from "./Login";
import Join from "./Join";
import Passwordfind from "./password-find";
import Quiz from "./Quiz/Quiz";
import Test from "./Test/Test";
import Protfolio from "./Protfolio";




const CommonRoutes  = () => {
  let element = useRoutes([
    { path: "/", element: <StartPage /> },

    {
      path: "/main", 
      element: <MainPage />,
    },

    {
      path: "/portfolio",
      element: <Protfolio />,
    },

    {
      path: "/ai",
      element: <Join />,
    }

    

    

   
    
  ]);

  return element;
};


export default CommonRoutes ;
