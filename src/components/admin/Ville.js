import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ville() {
  const [villes, setVilles] = useState([]);
  const [nom, setNom] = useState('');
  const [editVilleId, setEditVilleId] = useState(null);


  useEffect(() => {
    fetchVilles();
  }, []);

  async function fetchVilles() {
    try {
      const response = await axios.get('http://localhost:8082/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
  }

  async function addVille() {
    try {
      await axios.post('http://localhost:8082/villes/save', { nom });
      setVilles([...villes, { nom }]);
      setNom('');
    } catch (error) {
      console.error('Error adding ville:', error);
    }
  }

  async function deleteVille(id) {
    try {
      await axios.delete(`http://localhost:8082/villes/delete/${id}`);
      const updatedVilles = villes.filter((ville) => ville.id !== id);
      setVilles(updatedVilles);
    } catch (error) {
      console.error('Error deleting ville:', error);
    }
  }
  function editVille(ville) {
    setEditVilleId(ville.id);
    setNom(ville.nom);
  }

  async function updateVille() {
    try {
      await axios.put(`http://localhost:8082/villes/save/${editVilleId}`, { nom });
      const updatedVilles = villes.map((ville) =>
        ville.id === editVilleId ? { ...ville, nom } : ville
      );
      setVilles(updatedVilles);
      setNom('');
      setEditVilleId(null);
    } catch (error) {
      console.error('Error updating ville:', error);
    }
  }
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Villes</h1>

      <form onSubmit={editVilleId ? updateVille : addVille} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ville Name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {editVilleId ? 'Update Ville' : 'Add Ville'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {villes.map((ville) => (
          <li
            key={ville.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {ville.nom}
            <div>
              <button
                onClick={() => editVille(ville)}
                className="btn btn-primary me-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteVille(ville.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>  );
}

export default Ville;
