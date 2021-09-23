/* eslint-disable react/no-danger */
// on nettoie le code avec DOMPurify
import React from 'react';
import PropTypes from 'prop-types';
// bibliothèque pour nettoyer le code HTML (empêcher attaques XSS, corriger balises
// non fermées, ...)
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

/*
  si on interprète du code HTML qui provient d'une saisie utilisateur (ou qu'il
  y a eu un hack du serveur ou une maladresse) : risque de faille XSS, présence de
  code Javascript qui sera exécuté si on interprète en HTML le contenu =>
  redirection vers une autre page, vol de données, ...
  Solution : nettoyer le code HTML pour pouvoir l'interpréter sans risque, par
  exemple avec DOMPurify

  10 failles de sécurité les plus courantes :
  https://owasp.org/www-project-top-ten/
*/

function createMarkup(content) {
  return {
    __html: DOMPurify.sanitize(content),
  };
}

const Post = ({ title, category, excerpt, slug }) => (
  <Link to={`/post/${slug}`} className="post">
    <article>
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup(excerpt)} />
    </article>
  </Link>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
