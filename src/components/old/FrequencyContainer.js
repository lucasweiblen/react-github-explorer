import React, {useState} from 'react';

function FrequencyContainer({frequencies, current, onChangeFrequency}) {
  const [currentFrequency, setCurrentFrequency] = useState(current);

  const handleCurrentFrequency = e => {
    console.log(e.target.textContent);
    setCurrentFrequency(e.target.textContent);
    onChangeFrequency(e.target.textContent);
  };

  const freq = frequencies.map((val, key) => {
    return (
      <p key={key} className="level-item">
        <button
          onClick={handleCurrentFrequency}
          className={
            currentFrequency === val
              ? 'button is-small is-rounded is-active'
              : 'button is-small is-rounded'
          }>
          {val}
        </button>
      </p>
    );
  });

  return <div className="level-right">{freq}</div>;
}

export default FrequencyContainer;
