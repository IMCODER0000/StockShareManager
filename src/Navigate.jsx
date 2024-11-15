import React, { useEffect, useState } from "react";
import "./css/Navigate.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Navigate() {
    const navigate = useNavigate();



    

    const handleClickToLogin = () => {
        navigate('/login');
    };

    const handleClickToMain = () => {
        navigate('/');
    };


    return (
        <div>
            <div className="Top-navigate">
                <div style={{ marginLeft: "10px" }}> 
                    <img 
                        onClick={handleClickToMain}
                        src={`${process.env.PUBLIC_URL}/Logo/Logo3.PNG`} 
                        alt="Logo" 
                        style={{ width: '140px', height: 'auto' }} 
                    />
                </div>
                {/* <div className="menu-Box">
                    <div 
                        className={`menus ${selectedMenu === 'quiz' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('quiz', '/quiz')}
                    >
                        AAAA
                    </div>
                    <div 
                        className={`menus ${selectedMenu === 'To' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('To', '/To')}
                    >
                        BBBB
                    </div>
                    <div 
                        className={`menus ${selectedMenu === 'test' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('test', '/test')}
                    >
                        CCCC
                    </div>
                    <div 
                        className={`menus ${selectedMenu === 'M' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('M', '/M')}
                    >
                        DDDD
                    </div>
                </div> */}
                <div className="login-Box" onClick={handleClickToLogin}>
                    <div className="login">로그인</div>
                </div>  
            </div>
        </div>
    );
}

export default Navigate;
