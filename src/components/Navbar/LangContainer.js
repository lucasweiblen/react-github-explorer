import React, {useState} from 'react';

const LangContainer = ({languages, current, onChangeLanguage}) => {
  //const [_languages, setLanguages] = useState(languages);
  const [_current, setCurrent] = useState(current);

  const handleCurrentLanguage = e => {
    setCurrent(e.target.textContent);
    onChangeLanguage(e.target.textContent);
  };

  const _langs = languages.map((language, key) => {
    const _btnClass = _current === language ? 'button is-active' : 'button';

    return (
      <button className={_btnClass} key={key} onClick={handleCurrentLanguage}>
        {language}
      </button>
    );
  });
  return <div>{_langs}</div>;
};

export default LangContainer;
