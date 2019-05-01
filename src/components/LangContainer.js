import React from 'react';
import {languages} from './../const';

const LangContainer = () => {
  const _langs = languages.map((language, key) => {
    return (
      <button className="button" key={key}>
        {language}
      </button>
    );
  });
  return <div>{_langs}</div>;
};

export default LangContainer;
