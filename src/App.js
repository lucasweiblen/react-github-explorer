import React, {Component, useState} from 'react';
//import logo from './logo.svg';
import {Tabs, Content, Container} from 'react-bulma-components/full';
import axios from 'axios';
import './App.css';

const languages = ['Clojure', 'Elixir', 'Go', 'Rust', 'Javascript'];

function Explorer(props) {
  const [repos, setRepos] = useState([]);
  const languagesTabs = props.languages.map((lang, i) => (
    <Tabs.Tab onClick={handleClick} key={i}>
      {lang}
    </Tabs.Tab>
  ));
  const reposContent = repos.map((repo, i) => (
    <Content key={i}>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Author: {repo.author}</p>
      <a href={repo.url}>{repo.url}</a>
      <p>Stars: {repo.stars}</p>
    </Content>
  ));

  function handleClick(e) {
    const selectedLanguage = e.target.innerText;
    fetchRepos({language: selectedLanguage});
  }

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
    <Container>
      <Tabs align="centered" type="toggle-rounded">
        {languagesTabs}
      </Tabs>
      <Content>{reposContent}</Content>
    </Container>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Explorer languages={languages} />
        </Container>
      </div>
    );
  }
}

export default App;
