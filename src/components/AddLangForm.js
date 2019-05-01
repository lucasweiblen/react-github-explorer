import React, {useState} from 'react';

const AddLangForm = ({languages, onAddLanguage}) => {
  const [language, setLanguage] = useState('');
  const handleChange = e => {
    setLanguage(e.target.value);
  };

  const handleAddLanguage = () => {
    if (language !== '') {
      console.log(`AddLanguageForm -> adding new language: ${language}`);
      onAddLanguage(language);
    }
  };
  return (
    <div>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            value={language}
            onChange={handleChange}
            placeholder="Add new language"
          />
        </div>
        <div className="control">
          <button onClick={handleAddLanguage} className="button is-outlined">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLangForm;
