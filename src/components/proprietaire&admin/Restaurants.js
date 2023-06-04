
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Restaurant= () => {
    const [restaurant, setRestaurant] = useState({
        nom: '',
        adresse: '',
        description: '',
        latitude: 0,
        longitude: 0,
        heureOuverture: '',
        heureFermeture: '',
        zone: '',
        serie: '',
        photos: [],
        specialite: [],
        utilisateur: '',
      });
      const [specialites, setSpecialites] = useState([]);
      const [users, setUsers] = useState([]);
      const [zones, setZones] = useState([]);
      const [selectedVilleId, setSelectedVilleId] = useState('');
      const [villes, setVilles] = useState([]);
      const [series, setSeries] = useState([]);

      const filteredZones = selectedVilleId
      ? zones.filter((zone) => zone.ville.id === parseInt(selectedVilleId))
      : zones;

    async function fetchSpecialites() {
          try {
              const response = await axios.get('http://localhost:8082/specialites/all');
              setSpecialites(response.data);
          } catch (error) {
              console.error('Error fetching specialites:', error);
          }
      }
      async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:8082/users/all');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    
    async function fetchSeries() {
        try {
            const response = await axios.get('http://localhost:8082/series/all');
            setSeries(response.data);
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    }
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
      async function addResto() {
        try {
          await axios.post('http://localhost:8082/restaurants/save', restaurant);

        } catch (error) {
          console.error('Error adding restaurant:', error);
        }
      }
    
      useEffect(() => {
        fetchZones();
        fetchVilles();
        fetchSpecialites();
        fetchSeries();
        fetchUsers();
        console.log(zones);
      }, []);
    

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          [name]: value,
        }));
      };
    
      const handlePhotoChange = (e) => {
        const { files } = e.target;
        const uploadedPhotos = Array.from(files).map((file) => file.name);
        setRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          photos: uploadedPhotos,
        }));
      };
    
      const handleSpecialiteChange = (e) => {
        const { options } = e.target;
        const selectedSpecialites = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          specialite: selectedSpecialites,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        addResto();
        console.log(restaurant);
        console.log(restaurant.zone);
        
      };
    
      return (
        <div className="container">
          <h1>Add Restaurant</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Name</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={restaurant.nom}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="adresse">Address</label>
              <input
                type="text"
                className="form-control"
                id="adresse"
                name="adresse"
                value={restaurant.adresse}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={restaurant.description}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  id="latitude"
                  name="latitude"
                  value={restaurant.latitude}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-group col-md-6">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  id="longitude"
                  name="longitude"
                  value={restaurant.longitude}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
    
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="heureOuverture">Opening Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="heureOuverture"
                  name="heureOuverture"
                  value={restaurant.heureOuverture}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-group col-md-6">
                <label htmlFor="heureFermeture">Closing Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="heureFermeture"
                  name="heureFermeture"
                  value={restaurant.heureFermeture}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
            <div className="form-group">
              <label htmlFor="zone">Zone</label>
              <select
                className="form-control"
                id="zone"
                name="zone"
                value={restaurant.zone}
                onChange={handleChange}
                required
              >
                <option value="">Select a zone</option>
                {filteredZones.map((zone) => ( 
               <option value={zone.id}>{zone.nom}</option>
               ))}
              </select>
            </div>
    
            <div className="form-group">
              <label htmlFor="serie">Series</label>
              <select
                className="form-control"
                id="serie"
                name="serie"
                value={restaurant.serie}
                onChange={handleChange}
                required
              >
                <option value="">Select a serie</option>
                {series.map((zone) => ( 
               <option value={zone.id}>{zone.nom}</option>
               ))}
              </select>
            </div>
    
            <div className="form-group">
              <label htmlFor="photos">Photos</label>
              <input
                type="file"
                className="form-control-file"
                id="photos"
                name="photos"
                multiple
                onChange={handlePhotoChange}
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="specialite">Specialties</label>
              <select
                className="form-control"
                id="specialite"
                name="specialite"
                value={restaurant.specialite}
                onChange={handleSpecialiteChange}
                multiple
                required
              >
               {specialites.map((specialite) => ( 
               <option value={specialite.id}>{specialite.nom}</option>
               ))}
              </select> 
            </div>
    
            <div className="form-group">
              <label htmlFor="utilisateur">User</label>
              <select
                className="form-control"
                id="utilisateur"
                name="utilisateur"
                value={restaurant.utilisateur}
                onChange={handleChange}
                
                required
              >
               {users.map((user) => ( 
               <option value={user.id}>{user.nom}</option>
               ))}
              </select> 
            </div>
    
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Restaurant
              </button>
            </div>
          </form>
        </div>
      );
    };

export default Restaurant;
