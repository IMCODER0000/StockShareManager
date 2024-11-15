import React, { useState, useEffect } from "react";
import "./Quiz/css/Quiz.css";
import PortfolioChart from "./PortfolioChart";
import "./PortfolioResult.css";
import PortfolioChart2 from "./PortfolioChart2";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Navigate from "./Navigate";

function PortfolioResult2() {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state?.stock) {
            navigate('/');
            return;
        }
    }, [location.state, navigate]);

    if (!location.state?.stock) {
        return null;
    }

    const { stock } = location.state;
    console.log("Rendering PortfolioResult2 with stock:", stock);

    return (
        <div>
            <div className="main-container">
                <Navigate />
                <div className="content-container2">
                    <div className="portfolio-main-box2">
                        <PortfolioChart2 {...stock} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioResult2;
