import React from 'react';

import './FilterCheckbox.css';


function FilterCheckbox(props) {

  return (
   <> 
      <label className='filtercheckbox__label' >
      <input className="filtercheckbox__input" type="checkbox"         
        id='filtercheckbox'
        name='filtercheckbox'
        onChange={props.onChange}
        value={props.value}
        checked={props.value || ''}
        />
      <span
        className="filtercheckbox__slider"
      />
      Короткометражки
      </label>
   </>
  );
}

export default FilterCheckbox;