import React, { useState, useEffect } from 'react';
import './Home.css'; 
import Receta from '../../Components/Receta.jsx'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [recetas, setRecetas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecetas, setFilteredRecetas] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Controla si mostrar o no el dropdown

  const navigate = useNavigate();

const fetchRecetas = async () => {
    const response = await fetch("http://localhost:3000/dishes");
    const data = await response.json();
    console.log(data);
    setRecetas(data);
    setFilteredRecetas(data);
  };

  useEffect(() => {
    fetchRecetas();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    
    
    const filtered = recetas.filter((receta) =>
      receta.imagen.toLowerCase().includes(searchValue)
    );
    setFilteredRecetas(filtered);
    setShowDropdown(true); 
  };

  
  const handleOptionClick = (recetaImagen) => {
    setSearchTerm(recetaImagen); 
    setShowDropdown(false); 
  };

  const handleAddRecetaClick = () => {
    navigate('/addReceta');
  };

  return (
    <div>
      <div className="home-title-wrapp">
        <h1>Libro de recetas</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar receta..."
            value={searchTerm} 
            onChange={handleSearch} 
            className="search-input"
          />

          
          {showDropdown && searchTerm && (
            <ul className="dropdown-list">
              {filteredReceta.map((receta) => (
                <li
                  key={receta.id}
                  onClick={() => handleOptionClick(receta.imagen)} 
                  className="dropdown-item"
                >
                  {receta.imagen}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={handleAddRecetaClick} className="add-receta-button">
          Agregar Receta
        </button>
      </div>

      {filteredRecetas.length ? (
        <div className="home-grid-cards">
          {filteredRecetas.map((receta) => (
            <Receta
              key={receta.id}
              image={receta.image}
              id={receta.id}
              title={receta.title}
              refreshRecetas={fetchRecetas}
            />
          ))}
        </div>
      ) : (
        <div className="home-no-recetas">No hay recetas para mostrar</div>
      )}
    </div>
  );
};

export default Home;