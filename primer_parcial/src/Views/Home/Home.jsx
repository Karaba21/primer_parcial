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

const getRecetas = async () => {
    const recetasFetch = await fetch('http://localhost:3000/dishes');
    const recetasA =  await recetasFetch.json()
    return recetasA;
};

const fetchReceta = async () => {
    try {
        const response = await fetch(`http://localhost:3000/dishes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecetas(data.dishes);
        console.log(recetas);
    } catch (error) {
        console.error('Error fetching receta:', error);
    }
};

useEffect(() => {
    fetchReceta();
}, []);

/*
const deleteReceta = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/dishes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setRecetas((prevRecetas) => prevRecetas.filter((receta) => receta.id !== id));
        setFilteredRecetas((prevRecetas) => prevRecetas.filter((receta) => receta.id !== id));
    } catch (error) {
        console.error('Error deleting receta:', error);
    }
};
*/
  useEffect(() => {
    fetchReceta();
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
              imagen={receta.imagen}
              id={receta.id}
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