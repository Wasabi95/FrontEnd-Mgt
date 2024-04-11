//recordList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Editar</Link> |
      <button className="btn btn-link" onClick={() => props.deleteRecord(props.record._id)}>
        Borrar
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        console.log('Records:', records);
        setRecords(records);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    }
  
    getRecords();
  }, []);
  
  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE"
      });
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    } catch (error) {
      setError(error.message);
    }
  }

  function recordList() {
    return records
      .filter((record) => {
        const nameMatch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
        const positionMatch = record.position.toLowerCase().includes(searchQuery.toLowerCase());
        const levelMatch = record.level.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || positionMatch || levelMatch;
      })
      .map((record) => (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      ));
  }

  // Define logout function
  const logout = () => {
    // Perform logout logic, such as clearing user authentication data
    localStorage.clear();
    // Navigate the user to the login page
    navigate("/"); // You may need to adjust the path according to your routes
  };

  return (
    
    <div className="tablex" style={{ margin: "20px" }}>
        <Navbar />
      <div className="d-flex justify-content-evenly align-items-center mb-3">
        <h3>Employee List</h3>
        <NavLink className="nav-link btn btn-primary" to="/create">
          <h3>Create Registry</h3>
        </NavLink>
        {/* Add logout button */}
        <button onClick={logout}>Logout</button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      )}
    </div>
  );
}
