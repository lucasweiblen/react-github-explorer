import React, {useState} from 'react';
import AddLanguageForm from './AddLanguageForm';

function LanguagesContainer({
  languages,
  current,
  onChangeLanguage,
  onAddLanguage,
}) {
  const [langs, setLanguages] = useState(languages);
  const [curr, setCurrent] = useState(current);

  const handleAddNewLanguage = ({language}) => {
    console.log(`LanguagesContainer -> adding new language ${language}`);
    setLanguages([...langs, language]);
    onAddLanguage(language); // need to check later if its necessary or not
  };

  const handleCurrentLanguage = e => {
    console.log(e.target.textContent);
    setCurrent(e.target.textContent);
    onChangeLanguage(e.target.textContent);
  };

  const _langs = langs.map((val, key) => {
    return (
      <button
        className={curr === val ? 'button is-active' : 'button'}
        key={key}
        onClick={handleCurrentLanguage}>
        {val}
      </button>
    );
  });

  // style -> marginLeft -> hacking for the moment
  return (
    <div>
      <AddLanguageForm addLanguageHandler={handleAddNewLanguage} />
      <br />
      <div style={{marginLeft: 500}}>{_langs}</div>
    </div>
  );
}

export default LanguagesContainer;
