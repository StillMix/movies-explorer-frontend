/* eslint-disable react-hooks/exhaustive-deps */
import { Switch, Route, useHistory, useRouteMatch, Redirect } from 'react-router';
import './App.css';
import Main from '../Main/Main';

import { UserContext} from '../../contexts/CurrentUserContext.js';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Movies from '../Movies/Movies';
import MenuPopup from '../MenuPopup/MenuPopup';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';

import Footer from '../Footer/Footer';
import React from 'react';

import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

function App() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [cards, setCards] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  const history = useHistory();

  const handleSignup = (user) => {
    MainApi.register(user.password, user.email, user.name).then(data => {
      if(data){
        console.log(data)
        history.push('/signin');
      }
    })
  };

  const handleSignin = (user) => {
    MainApi.authorize(user.password, user.email).then(data => {
      if(data){
        setCurrentUser(data);
      }
    }).finally(() => {
      localStorage.setItem('token', user.email);
      MoviesApi.getMovies().then((res) => {
        if(res) {
          setCards(res)
        }
      })
      .finally(() => {
        MainApi.getContent().then((res) => {
          if(res.message === 'Необходима авторизация'){
           console.log(res)
          }else{
            setCurrentUser(res);
            console.log(currentUser)
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    })
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    history.push('/');
  };

  function closePopup() {
    setIsOpenMenu(false)
  }

  function openMenuPopup() {
    setIsOpenMenu(true)
  }

  function tokenCheck() {
    if(localStorage.getItem('token')){
      MoviesApi.getMovies().then((res) => {
        if(res) {
          setCards(res)
        }
      })
      .finally(() => {
        MainApi.getContent().then((res) => {
          if(res.message === 'Необходима авторизация'){
           console.log(res)
          }else{
            setCurrentUser(res);
            console.log(currentUser)
            setLoggedIn(true);
          }
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
 }
 }

 React.useEffect(() =>{
  tokenCheck()
},[])


  const routesHeader = [
    '/notfound',
    '/signin',
    '/signup',
  ];

  const routesFooter = [
    '/notfound',
    '/signin',
    '/signup',
    '/profile',
  ];

  return (
   <>
   <UserContext.Provider value={currentUser}>
   <div className={`body ${isOpenMenu ? 'body_menu_open' : ''}`}>
   <div className="page">
     {
       useRouteMatch(routesHeader) ?
       (
         null
       ): (
        <Header
        isOpen={isOpenMenu}
        setIsOpen={openMenuPopup}
         loggedIn={loggedIn}
         onSignup={handleSignup}
         onSignin={handleSignin}
         />
       )

     }
     <Switch>

     <Route exact path="/" >
          <Main />
      </Route>

      <Route  path="/signup">
          <Register onSignUp={handleSignup}/>
      </Route>

      <Route  path="/signin">
          <Login onSignIn={handleSignin}/>
      </Route>

      <Route  path="/notfound">
      <NotFound />


      </Route>
      <ProtectedRoute
       path="/movies"
       loggedIn={loggedIn}
       component={Movies}
      />
      <ProtectedRoute
       path="/saved-movies"
       loggedIn={loggedIn}
       component={SavedMovies}
      />
      <ProtectedRoute
      onSignOut={handleSignOut}
       path="/profile"
       loggedIn={loggedIn}
       component={Profile}
      />


      <Route path="*">
      <Redirect to="/notfound" />
       </Route>

       </Switch>
       {
       useRouteMatch(routesFooter) ?
       (
         null
       ): (
        <Footer />
       )

     }
   <MenuPopup isOpen={isOpenMenu} setIsClose={closePopup}/>
   </div>
   </div>
   </UserContext.Provider>
   </>
  );
}

export default App;
