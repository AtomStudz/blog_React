import React from 'react';
import PropTypes from 'prop-types';
// composant Link : permet de représenter un lien (balise a) vers une autre page,
// placera la valeur de sa prop "to" dans la barre d'adresse, mais sans recharger
// la page quand on clique sur le lien

// composant NavLink : comme Link mais en appliquant automatiquement une classe CSS
// supplémentaire si l'URL correspond à ce qui est dans la barre d'adresse. Par
// défaut ça ajoute la class "active", on peut choisir une autre classe avec la prop
// activeClassName.
// La comparaison est "qui commence par" : si URL "/react" alors ça commence par "/"
// donc à la fois "Accueil" et "React" sont sélectionnés => pour avoir une comparaison
// exacte on ajoute la prop "exact"
import { NavLink } from 'react-router-dom';

import './header.scss';

// quand un composant a une prop de type booléen, on peut écrire plus simplement :
// - si on veut laProp={true} => 'laProp'
// - si on veut laProp={false} => ''

const Header = ({ categories }) => (
  <header className="header">
    <nav>
      {categories.map((category) => (
        <NavLink
          key={category.label}
          className="header-link"
          to={category.route}
          activeClassName="header-link--active"
          exact
        >
          {category.label}
        </NavLink>
      ))}
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
