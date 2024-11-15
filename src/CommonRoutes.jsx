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
import Protfolio2 from "./Protfolio2";
import PortfolioChart2 from "./PortfolioChart2";
import PortfolioResult2 from "./PortfolioResult2";




const CommonRoutes  = () => {
  let element = useRoutes([
    { path: "/", element: <MainPage /> },



    {
      path: "/portfolio",
      element: <Protfolio />,
    },

    {
      path: "/ai",
      element: <Protfolio2 />,
    },

    {
      path: "/ai/result",
      element: <PortfolioResult2 />,
    }

    

    

   
    
  ]);

  return element;
};


export default CommonRoutes ;
