import React from 'react';

function Tab({active, text, onClickHandler}) {
  function handleClick(e) {
    let language = '';
    if (e.target.textContent !== undefined) {
      e.target.parentElement.className = 'is-active';
      language = e.target.textContent.toLowerCase();
      onClickHandler({language: language});
    }
  }
  return (
    <li className={active ? 'is-active' : ''}>
      <a onClick={handleClick}>
        <span>{text}</span>
      </a>
    </li>
  );
}

export default Tab;
