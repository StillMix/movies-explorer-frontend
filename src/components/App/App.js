import { Switch, Route, useHistory, useRouteMatch, } from 'react-router';
import './App.css';
import Main from '../Main/Main';

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

function App() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  const handleSignup = () => {
    history.push('/signin');
  };

  const handleSignin = () => {
    setLoggedIn(true);
    history.push('/');
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

  const routesHeader = [
    '/signin',
    '/signup',
  ];

  const routesFooter = [
    '/signin',
    '/signup',
    '/profile',
  ];

  return (
   <> 
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

      <Route  path="/movies">
          <Movies />
      </Route>
      <Route  path="/saved-movies">
          <SavedMovies />
      </Route>
      <Route  path="/profile">
          <Profile onSignOut={handleSignOut}/>
      </Route>
      <Route  path="/signup">
          <Register onSignUp={handleSignup}/>
      </Route>
      <Route  path="/signin">
          <Login onSignIn={handleSignin}/>
      </Route>
         
      <Route path="*">
        <NotFound />
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
   </>
  );
}

export default App;
