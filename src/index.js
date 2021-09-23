// == Import : npm
import React from 'react';
import { render } from 'react-dom';
/*
react-router-dom : bibliothèque qui permet de gérer la navigation entre les "pages"
(on a une seule page, on ne recharge jamais, mais on veut faire croire au navigateur
qu'on a plusieurs pages)
Router : alias pour le nom de l'import
react-router-dom interagit avec la barre d'adresse sans recharger la page, grâce à
l'API History qui est intégrée dans le navigateur
https://developer.mozilla.org/en-US/docs/Web/API/History
*/
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
// Composants
import App from 'src/components/App';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Router>
    <App />
  </Router>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
