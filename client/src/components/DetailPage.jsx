// DetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/DetailPage.css";
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const navigate = useNavigate();
  const { id, query } = useParams();
  const [breedDetail, setBreedDetail] = useState(null);
  const onClickVolver = ()=>{
    navigate("/home")
    }
  useEffect(() => {
    const fetchBreedDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/id/${id}?source=${query}`);
        setBreedDetail(response.data); // Guardar los detalles de la raza de perro
      } catch (error) {
        console.error(
          "Error al obtener los detalles de la raza de perro:",
          error
        );
        // Manejar errores de solicitud aquí
      }
    };
    

    fetchBreedDetail(); // Cargar los detalles de la raza de perro al montar el componente
  }, [id]); // Se ejecuta cada vez que cambia el parámetro "id"

  if (!breedDetail) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los detalles
  }

  const { nombre, imagen, altura, peso, temperamento, anio_de_vida } =
    breedDetail;

  return (
    <div className="background-detail">
    <div className="detail-page">
      <h1>Detalle Perro</h1>
      <h1>Nombre: {nombre}</h1>
      <img src={imagen} alt={nombre} />

      <div className="detail-field">
        <label>Altura:</label>
        <input type="text" value={altura + " cm"} readOnly />
      </div>

      <div className="detail-field">
        <label>Peso:</label>
        <input type="text" value={peso + " kg"} readOnly />
      </div>

      <div className="detail-field">
        <label>Temperamentos:</label>
        <input type="text" value={temperamento} readOnly />
      </div>

      <div className="detail-field">
        <label>Años de Vida:</label>
        <input type="text" value={anio_de_vida} readOnly />
      </div>
      <div className="button-container">
      <button className="create-button" onClick={onClickVolver}>Volver</button>
      </div>
    </div>
    </div>
  );
};

export default DetailPage;
