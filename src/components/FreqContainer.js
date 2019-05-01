import React from 'react';
import {frequencies} from './../const';

const FreqContainer = () => {
  const _freq = frequencies.map((frequency, key) => {
    return (
      <button className="button" key={key}>
        {frequency}
      </button>
    );
  });
  return <div>{_freq}</div>;
};

export default FreqContainer;
