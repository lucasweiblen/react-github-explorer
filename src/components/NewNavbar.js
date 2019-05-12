import React from 'react';
import AddLangForm from './AddLangForm';
import LangContainer from './LangContainer';
import FreqContainer from './FreqContainer';

const NewNavBar = props => {
  const handleChangeLanguage = language => {
    console.log(`NewNavBar -> language: ${language}`);
    props.onChangeLanguage(language);
  };

  const handleAddLanguage = language => {
    console.log(`NewNavBar -> language: ${language}`);
    props.onAddLanguage(language);
  };

  const handleChangeFrequency = frequency => {
    console.log(`NewNavBar -> frequency: ${frequency}`);
    props.onChangeFrequency(frequency);
  };

  return (
    <div className="level">
      <div className="level-left">
        <AddLangForm
          languages={props.languages}
          onAddLanguage={handleAddLanguage}
        />
      </div>
      <div className="level-item">
        <LangContainer
          onChangeLanguage={handleChangeLanguage}
          languages={props.languages}
          current={props.currentLanguage}
        />
      </div>
      <div className="level-right">
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
