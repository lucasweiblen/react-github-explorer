import React from 'react';
import AddLangForm from './AddLangForm';
import LangContainer from './LangContainer';
import FreqContainer from './FreqContainer';

const NewNavBar = props => {
  return (
    <div class="level">
      <div class="level-left">
        <AddLangForm />
      </div>
      <div class="level-item">
        <LangContainer />
      </div>
      <div class="level-right">
        <FreqContainer />
      </div>
    </div>
  );
};

export default NewNavBar;
