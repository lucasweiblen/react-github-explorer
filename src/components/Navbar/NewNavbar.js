import React from 'react';
import AddLangForm from './AddLangForm';
import LangContainer from './LangContainer';
import FreqContainer from './FreqContainer';
import './NewNavbar.css';

const NewNavBar = props => {
  const handleChangeLanguage = language => {
    //console.log(`NewNavBar -> language: ${language}`);
    props.onChangeLanguage(language);
  };

  const handleAddLanguage = language => {
    //console.log(`NewNavBar -> language: ${language}`);
    props.onAddLanguage(language);
  };

  const handleChangeFrequency = frequency => {
    //console.log(`NewNavBar -> frequency: ${frequency}`);
    props.onChangeFrequency(frequency);
  };

  return (
    <div className="level">
      <div className="level-left level__form">
        <AddLangForm
          languages={props.languages}
          onAddLanguage={handleAddLanguage}
        />
      </div>
      <div className="level-item level__language">
        <LangContainer
          onChangeLanguage={handleChangeLanguage}
          languages={props.languages}
          current={props.currentLanguage}
        />
      </div>
      <div className="level-right level__frequency">
        <FreqContainer
          onChangeFrequency={handleChangeFrequency}
          frequencies={props.frequencies}
          current="Daily"
        />
      </div>
    </div>
  );
};

export default NewNavBar;
