import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Serie() {
    const [series, setSeries] = useState([]);
    const [nom, setNom] = useState('');
    const [editSerieId, setEditSerieId] = useState(null);

    useEffect(() => {
        fetchSeries();
    }, []);

    async function fetchSeries() {
        try {
            const response = await axios.get('http://localhost:8082/series/all');
            setSeries(response.data);
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    }

    async function addSerie() {
        try {
            if (editSerieId) {
                await axios.post(`http://localhost:8082/series/save`, {
                    id: editSerieId,
                    nom: nom,
                });
                const updatedSeries = series.map((serie) =>
                    serie.id === editSerieId ? { ...serie, nom: nom } : serie
                );
                setSeries(updatedSeries);
                setNom('');
                setEditSerieId(null);
            } else {
                await axios.post('http://localhost:8082/series/save', { nom });
                setSeries([...series, { id: series.length + 1, nom }]);
                setNom('');
            }
        } catch (error) {
            console.error('Error adding/editing serie:', error);
        }
    }

    async function deleteSerie(id) {
        try {
            await axios.delete(`http://localhost:8082/series/delete/${id}`);
            const updatedSeries = series.filter((serie) => serie.id !== id);
            setSeries(updatedSeries);
        } catch (error) {
            console.error('Error deleting serie:', error);
        }
    }

    function editSerie(serie) {
        setEditSerieId(serie.id);
        setNom(serie.nom);
    }

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Series</h1>

            <form onSubmit={addSerie} className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Serie Name"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        {editSerieId ? 'Update Serie' : 'Add Serie'}
                    </button>
                </div>
            </form>

            <ul className="list-group">
                {series.map((serie) => (
                    <li
                        key={serie.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {serie.nom}
                        <div>
                            <button onClick={() => editSerie(serie)} className="btn btn-primary me-2">
                                Edit
                            </button>
                            <button onClick={() => deleteSerie(serie.id)} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Serie;
