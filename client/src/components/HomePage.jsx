import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Card from "./CardItem";
import "../styles/HomePage.css";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [dogBreeds, setDogBreeds] = useState([]);
  // const [allDogBreeds, setAllDogBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedOption, setSelectedOption] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchDogBreeds(); // Llama a la función para cargar las razas de perros al cargar la página
  }, []);

  const fetchDogBreeds = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dogs/");
      //setAllDogBreeds(response.data); // Guardar todas las razas de perros
      setDogBreeds(response.data);
    } catch (error) {
      console.error("Error al obtener las razas de perros:", error);
      // Maneja errores de solicitud aquí
    }
  };

  const handleSearch = async (data) => {
    setDogBreeds(data);
    let filteredBreeds = [...dogBreeds];

    // Aplicar ordenamiento
    if (sortBy === "name") {
      filteredBreeds.sort((a, b) => {
        const nameA = a.nombre.toLowerCase();
        const nameB = b.nombre.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (sortBy === "weight") {
      filteredBreeds.sort((a, b) => {
        const pesoA = a.peso;
        const pesoB = b.peso;
        return sortOrder === "asc"
          ? pesoA.localeCompare(pesoB)
          : pesoB.localeCompare(pesoA);
      });
    }

    // Actualizar la lista de razas de perros mostradas según la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDogBreeds(filteredBreeds);
  };

  const fetchData = async (option) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs/?source=${option}`
      ); // Ejemplo de URL de la API
      setDogBreeds(response.data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
      // setResultData(null); // Borra el resultado en caso de error
    }
  };

  const handleChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    fetchData(option);
  };

  const handleClickCreate = () => {
    navigate("/add");
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    handleSearch(); // Aplicar ordenamiento cuando cambia la opción de orden
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
    handleSearch(); // Aplicar ordenamiento cuando cambia la opción de orden
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch(); // Actualizar la lista de razas de perros al cambiar de página
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dogBreeds.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="home-page">
      <h1>Bienvenido A Nuestro Catálogo</h1>

      <SearchBar onSearch={handleSearch} searchSource={selectedOption} />

      <div>
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Nombre</option>
          <option value="weight">Peso</option>
        </select>

        <label>Orden:</label>
        <select value={sortOrder} onChange={handleOrderChange}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div className="button-container">
        <button className="create-button" onClick={handleClickCreate}>
          Crear
        </button>
      </div>

      <div>
        <h2>Selecciona una opción:</h2>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedOption === "all"}
            onChange={handleChange}
          />
          Todos los perros
        </label>
        <label>
          <input
            type="radio"
            value="db"
            checked={selectedOption === "db"}
            onChange={handleChange}
          />
          Perros de la BD
        </label>
        <label>
          <input
            type="radio"
            value="api"
            checked={selectedOption === "api"}
            onChange={handleChange}
          />
          Perros del API
        </label>
      </div>

      <div className="card-list">
        {currentItems.map((breed) => (
          <Card key={breed.id} breed={breed} source={selectedOption} />
        ))}
      </div>

      {/* Renderiza la paginación */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(dogBreeds.length / itemsPerPage) },
          (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
