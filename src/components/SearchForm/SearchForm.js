import React from 'react';

import './SearchForm.css';

import SerachIcon from '../../images/search-icon.svg';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [values, setValues] = React.useState({
    search: ''
  });

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value
    });
   
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(values);
    setValues({
      search: ''
    })
  };

  return (
   <> 
    <form onSubmit={handleSubmit} className="searchform">
    <img src={SerachIcon} className="searchform__icon" alt="Поиск"/>
    <input name="search" minLength="1" maxLength="30" value={values.search} onChange={handleChange} className="searchform__input" placeholder="Фильмы" required/>
    <button type="submit" className="searchform__btn"></button>
    <FilterCheckbox onChange={handleChange} value={values.filtercheckbox}/>
    </form>

   </>
  );
}

export default SearchForm;