import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Specialite() {
    const [specialites, setSpecialites] = useState([]);
    const [nom, setNom] = useState('');
    const [editSpecialiteId, setEditSpecialiteId] = useState(null);

    useEffect(() => {
        fetchSpecialites();
    }, []);

    async function fetchSpecialites() {
        try {
            const response = await axios.get('http://localhost:8082/specialites/all');
            setSpecialites(response.data);
        } catch (error) {
            console.error('Error fetching specialites:', error);
        }
    }

    async function addSpecialite() {
        try {
            if (editSpecialiteId) {
                await axios.post(`http://localhost:8082/specialites/save`, {
                    id: editSpecialiteId,
                    nom: nom,
                });
                const updatedSpecialites = specialites.map((specialite) =>
                    specialite.id === editSpecialiteId ? { ...specialite, nom: nom } : specialite
                );
                setSpecialites(updatedSpecialites);
                setNom('');
                setEditSpecialiteId(null);
            } else {
                await axios.post('http://localhost:8082/specialites/save', { nom });
                setSpecialites([...specialites, { id: specialites.length + 1, nom }]);
                setNom('');
            }
        } catch (error) {
            console.error('Error adding/editing specialite:', error);
        }
    }

    async function deleteSpecialite(id) {
        try {
            await axios.delete(`http://localhost:8082/specialites/delete/${id}`);
            const updatedSpecialites = specialites.filter((specialite) => specialite.id !== id);
            setSpecialites(updatedSpecialites);
        } catch (error) {
            console.error('Error deleting specialite:', error);
        }
    }

    function editSpecialite(specialite) {
        setEditSpecialiteId(specialite.id);
        setNom(specialite.nom);
    }

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Specialites</h1>

            <form onSubmit={addSpecialite} className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Specialite Name"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        {editSpecialiteId ? 'Update Specialite' : 'Add Specialite'}
                    </button>
                </div>
            </form>

            <ul className="list-group">
                {specialites.map((specialite) => (
                    <li
                        key={specialite.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {specialite.nom}
                        <div>
                            <button onClick={() => editSpecialite(specialite)} className="btn btn-primary me-2">
                                Edit
                            </button>
                            <button onClick={() => deleteSpecialite(specialite.id)} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Specialite;
