/* eslint-disable eqeqeq */
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
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import Footer from '../Footer/Footer';

import * as MainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import ErroreMessage from '../ErroreMessage/ErroreMessage';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [MoviesCard, setMovies] = React.useState([]);
  const [savedMoviesCard, setSavedMovies] = React.useState([]);
  const [SavedMoviesId, setSavedMoviesId] = React.useState([]);
  const [IsOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isErrore, setIsErrore] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const showSuccess = () => {
    setIsSuccess(true);
  };

  const showError = (msg) => {
    if (msg == 'Validation failed') {
      setMessage('Введены некоректные данные');
    } else {
      setMessage(msg);
    }
    setIsErrore(true);
  };

  const history = useHistory();

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

  React.useEffect(() => {
    getUserData();
  }, []);

  const handleUpdateProfile = async (userData) => {
    try {
      setIsFormDisabled(true);
      const user = await MainApi.updateProfile(userData);

      setCurrentUser(user);
      showSuccess();
    } catch (err) {
      showError(err.message);
    } finally {
      setIsFormDisabled(false);
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      const SavedMovies = localStorage.getItem('SavedMovies');
      const Movies = localStorage.getItem('movies');
      const searchedMovies = localStorage.getItem('searchedMovies');
      const SearchedSavedMovies = localStorage.getItem('searchedSavedMovies');
      if (SavedMovies) {
        if (SearchedSavedMovies) {
          setSavedMovies(JSON.parse(SearchedSavedMovies));
        } else {
          setSavedMovies(JSON.parse(SavedMovies));
        }
      } else {
        MainApi.getMovies().then((res) => {
          setSavedMovies([MoviesCard, ...res]);
          localStorage.setItem('SavedMovies', JSON.stringify(res));
        });
      }
      if (Movies) {
        if (searchedMovies) {
          setMovies(JSON.parse(searchedMovies));
        } else {
          setMovies(JSON.parse(Movies));
        }
      } else {
        moviesApi.getMovies().then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          setMovies([MoviesCard, ...res]);
        });
      }
    }
  }, [isLoggedIn]);

  const handleLogin = async (userData) => {
    try {
      setIsFormDisabled(true);
      const user = await MainApi.login(userData);
      if (user) {
        history.push('/');
        getUserData();
        setIsLoggedIn(true);
      }
    } catch (err) {
      showError(err.message);
      setCurrentUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setIsFormDisabled(true);
      await MainApi.register(userData).then((data) => {
        if (data) {
          history.push('/signin');
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      showError(err.message);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const handleSignout = async () => {
    try {
      await MainApi.logout();

      setIsLoggedIn(false);
      setCurrentUser(null);

      setMovies(null);
    } catch (err) {
      showError(err.message);
      console.log('произошла ошибка');
    }
  };

  const filterMovie = (movies, keyword = '', minDuration) => movies.filter(
    (movie) => (keyword ? movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) : true)
        && movie.duration > minDuration,
  );

  async function searchMovies(word) {
    if (word.search == '') {
      localStorage.removeItem('searchedMovies');
      const movies = localStorage.getItem('movies');
      setMovies(JSON.parse(movies));
    } else {
      const movies = localStorage.getItem('movies');
      const checkbox = word.filtercheckbox ? word.filtercheckbox : null;
      const keyword = word.search ? word.search.toLowerCase() : null;
      const minDuration = checkbox ? 0 : 40;
      if (!movies) {
        moviesApi.getMovies().then((movie) => {
          localStorage.setItem('movies', JSON.stringify(movie));
          const filter = filterMovie(movie, keyword, minDuration);
          setMovies(filter);
          localStorage.setItem('searchedMovies', JSON.stringify(filter));
        }).catch((err) => {
          showError(err.message);
        });
      } else {
        const movies = JSON.parse(localStorage.getItem('movies'));
        const filter = filterMovie(movies, keyword, minDuration);
        setMovies(filter);
        localStorage.setItem('searchedMovies', JSON.stringify(filter));
      }
    }
  }

  const searchSavedMovies = (word) => {
    if (word.search == '') {
      localStorage.removeItem('searchedSavedMovies');
      const SavedMovies = localStorage.getItem('SavedMovies');
      setSavedMovies(JSON.parse(SavedMovies));
    } else {
      const SavedMovies = localStorage.getItem('SavedMovies');
      const checkbox = word.filtercheckbox ? word.filtercheckbox : null;
      const keyword = word.search ? word.search.toLowerCase() : null;
      const minDuration = checkbox ? 0 : 40;
      if (!SavedMovies) {
        MainApi.getMovies().then((movie) => {
          localStorage.setItem('SavedMovies', JSON.stringify(movie));
          const filter = filterMovie(movie, keyword, minDuration);
          setSavedMovies(filter);
          localStorage.setItem('searchedSavedMovies', JSON.stringify(filter));
        }).catch((err) => {
          showError(err.message);
        });
      } else {
        const SavedMovies = JSON.parse(localStorage.getItem('SavedMovies'));
        const filter = filterMovie(SavedMovies, keyword, minDuration);
        setSavedMovies(filter);
        localStorage.setItem('searchedSavedMovies', JSON.stringify(filter));
      }
    }
  };

  const saveMovie = async (movie) => {
    try {
      const savedMovie = await MainApi.saveMovie(movie);
      setSavedMovies([...savedMoviesCard, savedMovie]);
      setSavedMoviesId([...SavedMoviesId, savedMovie.movieId]);
      localStorage.removeItem('SavedMovies');
      MainApi.getMovies().then((res) => {
        localStorage.setItem('SavedMovies', JSON.stringify(res));
      });
    } catch (err) { showError(err.message); }
  };

  const removeMovie = async (movieId) => {
    try {
      savedMoviesCard.map((i) => {
        if (i.movieId === movieId) {
          const removedMovie = MainApi.removeMovie(i._id);
          setSavedMovies((state) => state.filter((c) => (c.id ? c.id : c.movieId !== movieId)));
          localStorage.removeItem('SavedMovies');
          MainApi.getMovies().then((res) => {
            localStorage.setItem('SavedMovies', JSON.stringify(res));
          });
        }
      });
    } catch (err) {
      showError(err.message);
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
                {isLoggedIn
                  ? < Redirect to="/movies" />
                  : <Register isFormDisabled={isFormDisabled} onSignUp={handleRegister} />
              }
              </Route>
              <Route path="/signin">
                {isLoggedIn
                  ? < Redirect to="/movies" />
                  : <Login isFormDisabled={isFormDisabled} onSignIn={handleLogin} />
                }
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
                isFormDisabled={isFormDisabled}
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
            <ErroreMessage
              message={message}
              isOpen={isErrore}
              setIsOpen={setIsErrore}
            />
            <SuccessMessage isOpen={isSuccess}
              setIsOpen={setIsSuccess}/>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
