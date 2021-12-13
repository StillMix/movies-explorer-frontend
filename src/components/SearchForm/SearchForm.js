import React from 'react';

import './SearchForm.css';

import SerachIcon from '../../images/search-icon.svg';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const word = props.word ? props.word : '';
  const { checkbox } = props;
  const [values, setValues] = React.useState({
    search: word,
    filtercheckbox: checkbox,
  });

  const handleChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.searchMovies(values);
  };

  return (
   <>
    <form onSubmit={handleSubmit} className="searchform">
    <img src={SerachIcon} className="searchform__icon" alt="Поиск"/>
    <input name="search" minLength="1" maxLength="30" value={values.search} onChange={handleChange} className="searchform__input" placeholder="Фильмы"/>
    <button type="submit" className="searchform__btn"></button>
    <FilterCheckbox onChange={handleChange} value={values.filtercheckbox}/>
    </form>

   </>
  );
}

export default SearchForm;
