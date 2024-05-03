// components/SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch, searchSource}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs?name=${query}&source=${searchSource}`);
      onSearch(response.data); // Llama a la función onSearch con los nuevos datos
      setQuery(""); // Limpia el campo de búsqueda después de la búsqueda exitosa
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      // Maneja errores de solicitud aquí
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar razas de perros..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
