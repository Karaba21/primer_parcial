

import React from "react"; 
import "./Receta.module.css"; 
import { useNavigate } from "react-router-dom"; // Hook para la navegación entre rutas de React Router.


const deleteReceta = async (id) => {
  
  const recetaDelete = await fetch("http://localhost:3000/dishes/" + id, {
    method: "DELETE", 
  });

  
  return recetaDelete;
};


const Receta = ({ title, id, refreshRecetas, image }) => {
  const navigate = useNavigate(); 

  
  
  const handleDetailsClick = () => {
    navigate(`/details/${id}`); 
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
        <h1 className="card-title">{title}</h1> 
        <h3 className="card-title">{image}</h3> 
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


