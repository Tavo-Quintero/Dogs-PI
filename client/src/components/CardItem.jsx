
import React from "react";
import "../styles/Card.css"; 
import { useNavigate } from 'react-router-dom';

const CardItem = ({ breed, source}) => {
  const { nombre, imagen, temperamento, peso, id} = breed;
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/detail/${source}/${id}`); 
  };
  return (
    <div className="card" onClick={handleCardClick} >
      <img src={imagen} alt={nombre} />
      <div className="card-content">
        <h3>{nombre}</h3>
        <p><strong>Peso:</strong> {peso} kg</p>
        <p><strong>Temperamentos:</strong> {temperamento}</p>
      </div>
    </div>
  );
};

export default CardItem;
