

import React, { useEffect, useState } from "react";
import "./Details.css"; 
import { useNavigate, useParams } from "react-router-dom";

const getRecetaByID = async (id) => {
  const recetaFetch = await fetch(`http://localhost:3000/dishes/${id}`);
  const receta = await recetaFetch.json();
  console.log(receta);
  return receta;
  
};

const Details = () => {
  const [receta, setReceta] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecetaByID(id).then((receta) => setReceta(receta));
  }, [id]);

  const updateReceta = async (id, updatedReceta) => {
    try {
        const response = await patch(`http://localhost:3000/dishes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReceta),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecetas((prevRecetas) =>
            prevRecetas.map((receta) => (receta.id === id ? data : receta))
        );
        setFilteredRecetas((prevRecetas) =>
            prevRecetas.map((receta) => (receta.id === id ? data : receta))
        );
    } catch (error) {
        console.error('Error updating receta:', error);
    }
};

  return (
    <div className="container">
      <h1>Detalles:</h1>
      {receta && (
        <div className="details-container">
          <div className="detail-item">
            <span className="detail-title">Imagen:</span>
            <span className="detail-content">{receta.image}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">Nombre:</span>
            <span className="detail-content">{receta.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">Descripción:</span>
            <span className="detail-content">{receta.description}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">Preparacion:</span>
            <span className="detail-content">{receta.preparation}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">Categoría:</span>
            <span className="detail-content">{receta.type}</span>
          </div>
        </div>
      )}
    <button onClick={() => navigate(`/edit/${id}`)} className="edit-button">
        Editar Receta
    </button>
      <button onClick={() => navigate(-1)} className="back-button">
        Volver
      </button>
    </div>
  );
};

export default Details;
