import React, {useState} from 'react';

const AddLanguageFormWithHooks = props => {
  const [language, setLanguage] = useState('');

  const handleChange = e => {
    setLanguage(e.target.value);
  };

  const handleSubmit = e => {
    console.log(`Adding new language: ${language}`);
    props.addLanguageHandler({language});
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={language}
        onChange={handleChange}
        placeholder="Add new language with hooks"
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default AddLanguageFormWithHooks;
