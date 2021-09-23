import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

import './posts.scss';

const Posts = ({ posts }) => (
  <main className="posts">
    <h1 className="title">Dev of Thrones</h1>
    <div className="posts-container">
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          category={post.category}
          excerpt={post.excerpt}
          slug={post.slug}
        />
      ))}
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Posts;
