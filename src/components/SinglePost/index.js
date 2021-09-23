import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import './singlePost.scss';

const SinglePost = ({ posts }) => {
  // useParams() retourne un objet qui contient tous les paramètres qu'on a
  // capturés dans l'URL (avec ":") => on décompose pour récupérer les paramètres
  const { slug } = useParams();
  // console.log(useParams());

  // trouver l'article qui a le slug indiqué
  const thePost = posts.find((post) => post.slug === slug);
  console.log(thePost);

  return (
    <article className="single-post">
      <h2 className="post-title">{thePost.title}</h2>
      <div className="post-category">{thePost.category}</div>
      <p className="post-content">{thePost.content}</p>
    </article>
  );
};

SinglePost.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default SinglePost;
