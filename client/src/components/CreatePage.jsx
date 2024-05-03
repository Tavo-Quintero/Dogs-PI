import React, { useState } from "react";
import "../styles/CreatePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MultiSelect from "./MultiSelect";

const CreatePage = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    alturaMinima: "",
    alturaMaxima: "",
    pesoMinimo: "",
    pesoMaximo: "",
    edadPromedio: "",
    temperamentos: [],
  });

  const handleMultiSelectChange = (ids) => {
    setSelectedIds(ids);
  };

  const options = [
    { id: 1, nombre: "Opción 1" },
    { id: 2, nombre: "Opción 2" },
    { id: 3, nombre: "Opción 3" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "alturaMinima" ||
      name === "alturaMaxima" ||
      name === "pesoMinimo" ||
      name === "pesoMaximo" ||
      name === "edadPromedio"
    ) {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue < 0) {
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("fo" + formData)
      // Hacer la solicitud POST usando Axios
      const response = await axios.post("http://localhost:3001/dogs/", {
        nombre: formData.nombre,
        altura: formData.alturaMinima + " - " + formData.alturaMaxima,
        peso: formData.pesoMinimo + " - " + formData.pesoMaximo,
        anio_de_vida: formData.edadPromedio,
        temperamentos: formData.temperamentos,
      });

      navigate("/home");

      // Aquí puedes agregar lógica adicional después de una respuesta exitosa
    } catch (error) {
      console.error("Error al crear perro:", error);
      // Manejar errores o mostrar mensajes al usuario
    }
  };
  const onClickVolver = () => {
    navigate("/home");
  };
  return (
    <div class="background-container">
  <div class="form-container">
    <div className="form-page">
      <h1>Crear Nuevo Perro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alturaMinima">Altura Mínima (cm):</label>
          <input
            type="number"
            id="alturaMinima"
            name="alturaMinima"
            value={formData.alturaMinima}
            onChange={handleChange}
            required
          />
          <label htmlFor="alturaMaxima">Altura Máxima (cm):</label>
          <input
            type="number"
            id="alturaMaxima"
            name="alturaMaxima"
            value={formData.alturaMaxima}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pesoMinimo">Peso Mínimo (kg):</label>
          <input
            type="number"
            id="pesoMinimo"
            name="pesoMinimo"
            value={formData.pesoMinimo}
            onChange={handleChange}
            required
          />
          <label htmlFor="pesoMaximo">Peso Máximo (kg):</label>
          <input
            type="number"
            id="pesoMaximo"
            name="pesoMaximo"
            value={formData.pesoMaximo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edadPromedio">Años de Vida Promedio:</label>
          <input
            type="number"
            id="edadPromedio"
            name="edadPromedio"
            value={formData.edadPromedio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperamentos">Temperamentos:</label>
          <MultiSelect options={options} onChange={handleChange} />
        </div>
        <button type="container">Crear Perro</button>
        <div className="button-container">
      <button className="create-button" onClick={onClickVolver}>Volver</button>
      </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreatePage;
