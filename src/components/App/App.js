/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-empty */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import React from 'react';
import Main from '../Main/Main';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Movies from '../Movies/Movies';
import MenuPopup from '../MenuPopup/MenuPopup';
import savedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';

import Footer from '../Footer/Footer';

import * as MainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [MoviesCard, setMovies] = React.useState([]);
  const [savedMoviesCard, setSavedMovies] = React.useState([]);
  const [SavedMoviesId, setSavedMoviesId] = React.useState([]);
  const [IsOpenMenu, setIsOpenMenu] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await MainApi.getUserData();

        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (err) {
        setCurrentUser({});
        setIsLoggedIn(false);
      }
    };

    getUserData();
  }, []);

  const handleUpdateProfile = async (userData) => {
    try {
      const user = await MainApi.updateProfile(userData);

      setCurrentUser(user);
    } catch (err) {

    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (isLoggedIn && token) {
      moviesApi.getMovies().then((res) => {
        setMovies([MoviesCard, ...res]);
      });
      MainApi.getMovies().then((res) => {
        if (res) {
          setSavedMovies(res);
        }
      });
    }
  }, [isLoggedIn]);

  const handleLogin = async (userData) => {
    try {
      const user = await MainApi.login(userData);
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('token', `${userData.email}`);
    } catch (err) {
      setCurrentUser(null);
      setIsLoggedIn(false);
    } finally {
      history.push('/');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await MainApi.register(userData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Произошла ошибка');
    } finally {
      history.push('/signin');
    }
  };

  const handleSignout = async () => {
    try {
      await MainApi.logout();

      setIsLoggedIn(false);
      setCurrentUser(null);

      localStorage.clear();
      setMovies(null);
    } catch (err) {
      console.log('произошла ошибка');
    }
  };

  async function searchMovies(word) {
    const checkbox = word.filtercheckbox ? word.filtercheckbox : null;
    const keyword = word.search ? word.search.toLowerCase() : null;
    const minDuration = checkbox ? 0 : 40;
    moviesApi.getMovies().then((movie) => {
      setMovies(movie);
      setMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyword) && c.duration > minDuration));
    });
  }

  const searchSavedMovies = (word) => {
    const checkbox = word.filtercheckbox ? word.filtercheckbox : null;
    const keyword = word.search ? word.search.toLowerCase() : null;
    const minDuration = checkbox ? 0 : 40;
    MainApi.getMovies().then((movie) => {
      setSavedMovies(movie);
      setSavedMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyword) && c.duration > minDuration));
    });
  };

  const saveMovie = async (movie) => {
    try {
      const savedMovie = await MainApi.saveMovie(movie);

      setSavedMovies([...savedMoviesCard, savedMovie]);
      setSavedMoviesId([...SavedMoviesId, savedMovie.movieId]);
    } catch (err) { }
  };

  const removeMovie = async (movieId) => {
    try {
      savedMoviesCard.map((i) => {
        if (i.movieId === movieId) {
          const removedMovie = MainApi.removeMovie(i._id);
          setSavedMovies((state) => state.filter((c) => (c.id ? c.id : c.movieId !== movieId)));
        }
      });
    } catch (err) {

    }
  };

  function handleSignup() {
    history.push('/signup');
  }

  function handleSignin() {
    history.push('/signin');
  }

  function openMenuPopup() {
    setIsOpenMenu(true);
  }

  function closePopup() {
    setIsOpenMenu(false);
  }

  const routesHeader = ['/notfound', '/signin', '/signup'];

  const routesFooter = ['/notfound', '/signin', '/signup', '/profile'];

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className={`body ${IsOpenMenu ? 'body_menu_open' : ''}`}>
          <div className="page">

            {useRouteMatch(routesHeader) ? null : (
              <Header
                isOpen={IsOpenMenu}
                setIsOpen={openMenuPopup}
                loggedIn={isLoggedIn}
                onSignup={handleSignup}
                onSignin={handleSignin}
              />
            )}
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/signup">
                <Register onSignUp={handleRegister} />
              </Route>
              <Route path="/signin">
                <Login onSignIn={handleLogin} />
              </Route>
              <Route path="/notfound">
                <NotFound />
              </Route>
              <ProtectedRoute
                saveMovie={saveMovie}
                searchMovies={searchMovies}
                cards={MoviesCard}
                removeMovie={removeMovie}
                savedMoviesIds={savedMoviesCard}
                path="/movies"
                loggedIn={isLoggedIn}
                component={Movies}
              />
              <ProtectedRoute
                searchMovies={searchSavedMovies}
                saveMovie={saveMovie}
                removeMovie={removeMovie}
                savedMoviesIds={savedMoviesCard}
                movies={savedMoviesCard}
                path="/saved-movies"
                loggedIn={isLoggedIn}
                component={savedMovies}
              />
              <ProtectedRoute
                onUpdateProfile={handleUpdateProfile}
                onSignOut={handleSignout}
                path="/profile"
                loggedIn={isLoggedIn}
                component={Profile}
              />
              <Route path="*">
                <Redirect to="/notfound" />
              </Route>
            </Switch>
            {useRouteMatch(routesFooter) ? null : <Footer />}
            <MenuPopup isOpen={IsOpenMenu} setIsClose={closePopup} />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
