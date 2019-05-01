import React from 'react';
import LanguagesContainer from './LanguagesContainer';
import FrequencyContainer from './FrequencyContainer';

function MainNavbar(props) {
  const handleChangeLanguage = language => {
    console.log(`MainNavBar -> language: ${language}`);
    props.onChangeLanguage(language);
  };

  const handleAddLanguage = language => {
    console.log(`MainNavBar -> language: ${language}`);
    props.onAddLanguage(language);
  };

  const handleChangeFrequency = frequency => {
    console.log(`MainNavBar -> frequency: ${frequency}`);
    props.onChangeFrequency(frequency);
  };

  return (
    <nav className="level">
      <LanguagesContainer
        onChangeLanguage={handleChangeLanguage}
        onAddLanguage={handleAddLanguage}
        languages={props.languages}
        current="Clojure"
      />
      <FrequencyContainer
        onChangeFrequency={handleChangeFrequency}
        frequencies={props.frequencies}
        current="Daily"
      />
    </nav>
  );
}

export default MainNavbar;
