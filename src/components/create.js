// components/create.js
import React, { useState } from "react";
import Navbar from './navbar';

export default function Create() {  
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const [message, setMessage] = useState(""); 

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("Usuario creado exitoxamente");
        setForm({ name: "", position: "", level: "" });
       
      } else {
        setMessage("Error: " + response.statusText);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <Navbar/>
      <h3>Crear Nuevo Registro</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>          
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Cargo</label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"
            value={form.position}
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label>Departamento:</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Tecnologia"
              checked={form.level === "Tecnologia"}
              onChange={updateForm}
            />
            <label className="form-check-label">Tecnologia</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Logistica"
              checked={form.level === "Logistica"}
              onChange={updateForm}
            />
            <label className="form-check-label">Logistica</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Finanzas"
              checked={form.level === "Finanzas"}
              onChange={updateForm}
            />
            <label className="form-check-label">Finanzas</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Administrativo"
              checked={form.level === "Administrativo"}
              onChange={updateForm}
            />   
            <label className="form-check-label">Administrativo</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Recursos Humanos"
              checked={form.level === "Recursos Humanos"}
              onChange={updateForm}
            />       
            <label className="form-check-label">Recursos Humanos</label>  
          </div>
          
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Crear Usuario"
            className="btn btn-primary"
          />
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}