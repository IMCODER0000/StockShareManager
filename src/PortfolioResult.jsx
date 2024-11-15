import React, { useState, useEffect } from "react";
import "./Quiz/css/Quiz.css";
import PortfolioChart from "./PortfolioChart";
import "./PortfolioResult.css";

function PortfolioResult({ myCost, riskLevel, plusData }) {

    return (
        <div className="content-container2">
            <div className="portfolio-main-box2">
                    {/* PortfolioChart만 렌더링 */}
                    <PortfolioChart myCost={myCost} riskLevel={riskLevel} plusData={plusData} />

            </div>
        </div>
    );
}

export default PortfolioResult;
