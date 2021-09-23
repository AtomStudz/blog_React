// == Import npm
import React, { useState, useEffect } from 'react';
// composant Route : permet de faire un rendu conditionnel en fonction de l'URL
// de la barre d'adresse. Comparaison "qui commence par", si on veut une comparaison
// exacte, ajouter la prop "exact" sur la Route concernée
// composant Switch : si on englobe nos Routes dans un Switch, alors la première
// Route qui correspond à l'URL est utilisée, les suivantes sont ignorées
// => permet d'avoir une Route par défaut qui affiche une page d'erreur 404
// Si la Route / a été placée à la fin du Switch,pas besoin de la prop "exact"
// composant Redirect : redirige vers une autre page (page qui a changé d'URL, ou
// authentification)
import { Route, Switch, Redirect } from 'react-router-dom';
// bibliothèque pour faciliter les appels AJAX
import axios from 'axios';

// == Import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Posts from 'src/components/Posts';
import Loader from 'src/components/Loader';
import SinglePost from 'src/components/SinglePost';

import { getPostsByCategory } from 'src/utils';

import './styles.scss';

/* Afficher le contenu d'un article
x on a le contenu de chaque article dans le state
x mettre un lien sur chaque extrait d'article en définissant une URL
x mettre en place une page (une URL) pour chaque article
x nouveau composant SinglePost pour afficher le détail d'un article (on doit pouvoir
  s'inspirer de Post)
*/

// == Composant
const App = () => {
  // useState : hook d'état, qui permet d'avoir un state, mais en laissant le
  // composant sous forme de fonction
  // useState permet de créer une case dans le state,
  // useState prend en argument la valeur initiale de la "case" du state et
  // retourne un tableau avec deux éléments, qu'on va décomposer (destructuring)
  // - variable qui permet de lire la valeur de la case
  // - fonction qui permet de modifier la valeur de la case
  // https://fr.reactjs.org/docs/hooks-state.html

  // setPosts(postsData) c'est un peu l'équivalent de
  // this.setState({
  //   posts: postsData,
  // })
  // => provoque un nouveau rendu du composant, mise à jour de l'affichage

  // stocker les articles dans le state
  const [posts, setPosts] = useState([]);

  // stocker les catégories dans le state
  const [categories, setCategories] = useState([]);

  // indique si les articles sont en cours de chargement
  const [loadingPosts, setLoadingPosts] = useState(true);

  // indique si les catégories sont en cours de chargement
  const [loadingCategories, setLoadingCategories] = useState(true);

  // const retourDelaFonction = useState(false);
  // console.log(retourDelaFonction);
  // const loading = retourDelaFonction[0];
  // const setLoading = retourDelaFonction[1];
  // console.log(`loading: ${loading}, setLoading : ${setLoading}`);

  const loadPosts = () => {
    console.log('on va charger les articles');

    // on fait une requête GET vers https://oclock-open-apis.vercel.app/api/blog/posts
    axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
      // callback appelée quand on a la réponse, si la réponse est un succès
      .then((response) => {
        console.log('On a reçu une réponse succès', response);
        setPosts(response.data);
      })
      // callback appelée quand on a la réponse, si la réponse est un échec
      .catch((error) => {
        // handle error
        console.log('On a reçu une réponse échec', error);
        // TODO il faudrait afficher un message d'erreur pour l'utilisateur, par
        // exemple prévoir un message affiché conditionnellement en fonction d'une
        // case du state
      })
      // callback appelée après avoir traité la réponse, que ce soit un succès ou
      // un échec
      .finally(() => {
        console.log('finally');
        // on programme la disparition du loader
        setLoadingPosts(false);
        // affiche true : la nouvelle valeur n'est pas encore prise en compte, elle
        // sera disponible au moment du prochain rendu
        console.log('juste après la mise à jour :', loadingPosts);
      });

    console.log('après l\'envoi de la requête');

    // quand on a la réponse, on enregistre les articles dans le state
    // setPosts(/* ici le tableau des articles retourné par l'API */);

    // et on fait disparaître le loader
  };

  const loadCategories = () => {
    axios.get('https://oclock-open-apis.vercel.app/api/blog/categories')
      // callback appelée quand on a la réponse, si la réponse est un succès
      .then((response) => {
        console.log('On a reçu une réponse succès', response);
        setCategories(response.data);
      })
      // callback appelée quand on a la réponse, si la réponse est un échec
      .catch((error) => {
        // handle error
        console.log('On a reçu une réponse échec', error);
        // TODO il faudrait afficher un message d'erreur pour l'utilisateur, par
        // exemple prévoir un message affiché conditionnellement en fonction d'une
        // case du state
      })
      // callback appelée après avoir traité la réponse, que ce soit un succès ou
      // un échec
      .finally(() => {
        console.log('finally');
        // on programme la disparition du loader
        setLoadingCategories(false);
      });
  };

  // hook d'effet : on fournit une callback à la fonction useEffect, la callback
  // sera appelée à un/des moments précis de la vie du composant
  // useEffect, c'est un peu l'équivalent de componentDidMount et componentDidUpdate
  // et componentWillUnmount

  // https://fr.reactjs.org/docs/hooks-effect.html

  // seulement componentDidMount (effet exécuté seulement après le tout premier
  // rendu du composant) => j'ajoute un tableau vide comme deuxième argument
  // j'appelle la fonction useEffect en lui fournissant comme premier argument une
  // callback, et comme deuxième argument un tableau vide
  useEffect(() => {
    console.log('useEffect');
    // on n'a aucune garantie que les réponses arrivent dans le même ordre que
    // l'ordre d'envoi des requêtes
    loadCategories();
    loadPosts();
  }, []);

  // ici on a bien accès à la nouvelle valeur du state
  console.log('au moment du rendu :', loadingPosts);

  return (
    <div className="app">
      <Header categories={categories} />
      {(loadingPosts || loadingCategories) && <Loader />}
      {!loadingPosts && !loadingCategories && (
        <Switch>
          <Redirect from="/jquery" to="/autre" />
          {categories.map((category) => (
            <Route path={category.route} exact key={category.label}>
              <Posts posts={getPostsByCategory(posts, category.label)} />
            </Route>
          ))}
          <Route path="/post/:slug">
            <SinglePost posts={posts} />
          </Route>
          <Route>
            <div>Page non trouvée, mais on a plein d'articles intéressants</div>
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
};

// == Export
export default App;
