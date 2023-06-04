import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Zone() {
  const [zones, setZones] = useState([]);
  const [nom, setNom] = useState('');
  const [selectedVilleId, setSelectedVilleId] = useState('');
  const [villes, setVilles] = useState([]);
  const [editZoneId, setEditZoneId] = useState(null);

  useEffect(() => {
    fetchZones();
    fetchVilles();
  }, []);

  async function fetchZones() {
    try {
      const response = await axios.get('http://localhost:8082/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  }

  async function fetchVilles() {
    try {
      const response = await axios.get('http://localhost:8082/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
  }

  async function addZone() {
    try {
      await axios.post('http://localhost:8082/zones/save', { nom, ville: { id: selectedVilleId } });
      setZones([...zones, { id: zones.length + 1, nom, ville: { id: selectedVilleId } }]);
      setNom('');
      setSelectedVilleId('');
    } catch (error) {
      console.error('Error adding zone:', error);
    }
  }
  

  async function deleteZone(id) {
    try {
      await axios.delete(`http://localhost:8082/zones/delete/${id}`);
      const updatedZones = zones.filter((zone) => zone.id !== id);
      setZones(updatedZones);
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  }

  function editZone(zone) {
    setEditZoneId(zone.id);
    setNom(zone.nom);
    setSelectedVilleId(zone.ville.id);
  }
  

  async function updateZone() {
    try {
      await axios.put(`http://localhost:8082/zones/save/${editZoneId}`, {
        id: editZoneId,
        nom,
        ville: { id: parseInt(selectedVilleId) }
      });
      const updatedZones = zones.map((zone) =>
        zone.id === editZoneId ? { ...zone, nom, ville: { id: parseInt(selectedVilleId) } } : zone
      );
      setZones(updatedZones);
      setNom('');
      setSelectedVilleId('');
      setEditZoneId(null);
    } catch (error) {
      console.error('Error updating zone:', error);
    }
  }
  
  
  

  const filteredZones = selectedVilleId
    ? zones.filter((zone) => zone.ville.id === parseInt(selectedVilleId))
    : zones;

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Zones</h1>

      <form onSubmit={editZoneId ? updateZone : addZone} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Zone Name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <select
            className="form-select"
            value={selectedVilleId}
            onChange={(e) => setSelectedVilleId(e.target.value)}
          >
            <option value="">Select Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>
                {ville.nom}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            {editZoneId ? 'Update Zone' : 'Add Zone'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {filteredZones.map((zone) => (
          <li
            key={zone.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {zone.nom}
            <div>
              <button
                onClick={() => editZone(zone)}
                className="btn btn-primary me-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteZone(zone.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Zone;
