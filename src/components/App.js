
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Ville from './admin/Ville';
import Zone from './admin/Zone';
import Serie from './admin/Serie';
import Specialite from './admin/Specialite';
import Restaurant from './proprietaire&admin/Restaurants';
import RestaurantList from './proprietaire&admin/RestaurantList';


function App() {
  return (
    <div className="App">
        <Header/>
        <Ville/>
        <Zone/>
        <Serie/>
        <Specialite/>
        <Restaurant/>
      
    </div>
  );
}

export default App;
