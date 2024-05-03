// components/LandingPage.js
import React from "react";
import { useDispatch } from "react-redux";
import { goToHome } from "../reducer/navegationAction";
import "../styles/LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
      navigate('/home');
    };
    return (
      <div className="background-container">
        <div className="container landing-page">
            <h1>Bienvenido A Nuestro Catalogos De Perros</h1>
            
            <button onClick={handleClick}>Catalogo</button>
          
        </div>
        </div>
    );
};

export default LandingPage;