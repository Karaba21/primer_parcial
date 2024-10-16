

import React from "react"; 
import "./Receta.module.css"; 
import { useNavigate } from "react-router-dom"; // Hook para la navegación entre rutas de React Router.

// Función asíncrona que se encarga de eliminar un juego por su ID.
const deleteReceta = async (id) => {
  // Realiza una petición DELETE a la API para eliminar el juego con el ID proporcionado.
  const recetaDelete = await fetch("http://localhost:3000/api/recetas/" + id, {
    method: "DELETE", // Especifica el método HTTP DELETE.
  });

  
  return recetaDelete;
};


const Receta = ({ title, id, refreshRecetas }) => {
  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas.

  
  
  const handleDetailsClick = () => {
    navigate(`/details/${id}`); // Cambia la URL a "/details/{id}" y navega a esa ruta.
  };

  
  
  const handleDeleteClick = async () => {
    const response = await deleteReceta(id); 
    if (response.ok) { 
      refreshRecetas(); 
    }
  };

  
  return (
    <div className="card"> 
      <div className="card-content"> 
        <h2 className="card-title">{title}</h2> 
        <div className="card-wrapp-buttons"> 
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button> 
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Receta;


