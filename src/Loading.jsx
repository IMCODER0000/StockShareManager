import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">자산 분배 중...</div>
    </div>
  );
}

export default Loading;
