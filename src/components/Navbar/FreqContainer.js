import React, {useState} from 'react';

const FreqContainer = props => {
  const {frequencies, onChangeFrequency, current} = props;
  const [_current, setCurrentFrequency] = useState(current);

  const handleCurrentFrequency = e => {
    setCurrentFrequency(e.target.textContent);
    onChangeFrequency(e.target.textContent);
  };

  const _freq = frequencies.map((frequency, key) => {
    const _btnClass =
      _current === frequency
        ? 'button is-small is-active'
        : 'button is-small is-primary is-inverted';

    return (
      <button className={_btnClass} key={key} onClick={handleCurrentFrequency}>
        {frequency}
      </button>
    );
  });
  return <div>{_freq}</div>;
};

export default FreqContainer;
