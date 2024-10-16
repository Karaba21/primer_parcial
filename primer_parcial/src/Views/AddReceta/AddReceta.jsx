
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "./AddReceta.css"; 

const AddReceta = () => {
  
  const [imagen, setImagen] = useState(""); 
  const [receta, setReceta] = useState(""); 
  const [descripcion, setDescripcion] = useState(""); 
  const [preparacion, setPreparacion] = useState(""); 
  const [categoria, setCategoria] = useState(""); 
  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas.

  
  
  const buttonIsDisabled = !imagen || !receta || !descripcion || !preparacion || !categoria;

  
  const handleAddReceta = async () => {
    const response = await fetch("http://localhost:3000/dishes", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
     
      body: JSON.stringify({ imagen, receta, descripcion, preparacion, categoria }),
    });

    if (response.ok) {
      navigate("/"); 
    }
  };

  


const handleSubmit = (e) => {
    e.preventDefault(); 
    handleAddReceta(); 
};

React.useEffect(() => {
    
    const checkPageStatus = () => {
        if (document.body.innerHTML === "") {
            console.error("La página se quedó en negro.");
        }
    };

    
    checkPageStatus();

    
    return () => {
        console.log("Componente desmontado.");
    };
}, []);

  return (
    <div>
      <h1>Agregar Receta</h1> 

      <div> 
        <div>
          <input
            type="text"
            placeholder="Imagen"
            value={imagen} 
            onChange={(e) => setImagen(e.target.value)} 
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Receta"
            value={receta} 
            onChange={(e) => setReceta(e.target.value)} 
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Preparacion"
            value={preparacion} 
            onChange={(e) => setPreparacion(e.target.value)} 
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categoria"
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
      </div>

      
      <button
        className="add-button" 
        onClick={handleAddReceta} 
        disabled={buttonIsDisabled} 
      >
        Agregar Receta
      </button>
    </div>
  );
};

export default AddReceta; 

