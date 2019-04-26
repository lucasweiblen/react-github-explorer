import React, {useState} from 'react';
import Tab from './Tab';
import axios from 'axios';

function Explorer({languages}) {
  const [repos, setRepos] = useState([]);
  const [selectedLang, setSelectedLang] = useState('Elixir');
  const tabItems = languages.map((item, i) => (
    <Tab
      active={selectedLang === item ? 'is-active' : ''}
      onClickHandler={fetchRepos}
      text={item}
      key={i}
    />
  ));
  const reposContent = repos.map((repo, i) => (
    <div key={i}>
      <h1 className="title is-5">{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Author: {repo.author}</p>
      <a href={repo.url}>{repo.url}</a>
      <p>Stars: {repo.stars}</p>
      <br />
    </div>
  ));

  const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function fetchRepos({language}) {
    console.log(`Fetching repos for ${language}`);
    setSelectedLang(capitalize(language));
    const url = `https://github-trending-api.now.sh/repositories?language=${language.toLowerCase()}`;
    axios
      .get(url)
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="tabs is-toggle is-toggle-rounded is-centered">
        <ul>{tabItems}</ul>
      </div>
      <div>{reposContent}</div>
    </div>
  );
}

export default Explorer;
