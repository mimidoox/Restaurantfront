import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8082/restaurants/all');
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Liste des restaurants</h2>
      <Carousel>
        {restaurants.map((restaurant) => (
          <Carousel.Item key={restaurant.id}>
            <Carousel.Caption>
              <h3>{restaurant.nom}</h3>
              <p>{restaurant.adresse}</p>
              <p>{restaurant.description}</p>
              <div>
                {restaurant.photos && restaurant.photos.length > 0 ? (
                  restaurant.photos.map((photo) => (
                    <img
                      key={photo.id}
                      className="d-block w-100"
                      src={photo.url}
                      alt={`Photo ${photo.id}`}
                    />
                  ))
                ) : (
                  <div>No photos available</div>
                )}
              </div>
              {/* Affichez les autres informations du restaurant ici */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RestaurantList;
