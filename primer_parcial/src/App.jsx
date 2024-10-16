

import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./Views/Home/Home"; 
import Details from "./Views/Details/Details"; 
import AddReceta from "./Views/AddReceta/AddReceta"; 

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        
        <Route path="/details/:id" element={<Details />} />
        
        
        <Route path="/addReceta" element={<AddReceta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
