import React, {Component, useState} from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import './App.css';

const languages = ['Clojure', 'Elixir', 'Go', 'Rust', 'Javascript'];

function Tab({active, text, onClickHandler}) {
  function handleClick(e) {
    let language = '';
    if (e.target.textContent !== undefined) {
      language = e.target.textContent.toLowerCase();
      console.log(language);
      onClickHandler({language: language});
    }
  }
  return (
    <li className={active ? 'is-active' : ''}>
      <a onClick={handleClick}>
        <span>{text}</span>
      </a>
    </li>
  );
}

function Explorer({languages}) {
  const [repos, setRepos] = useState([]);
  const tabItems = languages.map((item, i) => (
    <Tab onClickHandler={fetchRepos} text={item} key={i} />
  ));
  const reposContent = repos.map((repo, i) => (
    <div key={i}>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Author: {repo.author}</p>
      <a href={repo.url}>{repo.url}</a>
      <p>Stars: {repo.stars}</p>
    </div>
  ));

  function fetchRepos({language}) {
    console.log(`Fetching repos for ${language}`);
    const url = `https://github-trending-api.now.sh/repositories?language=${language.toLowerCase()}`;
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        setRepos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="tabs is-centered">
        <ul>{tabItems}</ul>
      </div>
      <div>{reposContent}</div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Explorer languages={languages} />
      </div>
    );
  }
}

export default App;
//const bla = e.target.parentNode.parentNode;
//const className = e.target.parentNode.parentNode.className;
//if (className !== '' && text !== '') {
//console.log('foi');
//bla.className = '';
//}
