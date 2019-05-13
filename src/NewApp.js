import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import NewNavBar from './components/NewNavbar';
import ProjectsContainer from './components/ProjectsContainer';
import {languages, frequencies, projects} from './const';
import Login from './components/Login';
import {Link, Router} from '@reach/router';

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: languages,
      frequencies: frequencies,
      projects: [],
      currentLanguage: languages[0],
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleAddLanguage = this.handleAddLanguage.bind(this);
    this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
  }

  componentDidMount() {
    this.fetchRepos(this.state.currentLanguage);
  }

  fetchRepos(language, frequency = 'Daily') {
    console.log(`Fetching repos for ${language}, frequency: ${frequency}`);
    const url = `https://github-trending-api.now.sh/repositories?language=${language.toLowerCase()}&since=${frequency.toLowerCase()}`;
    axios
      .get(url)
      .then(response => {
        this.setState({projects: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeLanguage(language) {
    console.log(`NewApp -> language: ${language}`);
    this.setState({currentLanguage: language});
    this.fetchRepos(language);
  }

  handleAddLanguage(language) {
    console.log(`NewApp -> language: ${language}`);
    this.setState({languages: [...this.state.languages, language]});
  }

  handleChangeFrequency(frequency) {
    console.log(`NewApp -> frequency: ${frequency}`);
    this.fetchRepos(this.state.currentLanguage, frequency);
  }

  render() {
    const navbarProps = {
      languages: this.state.languages,
      frequencies: this.state.frequencies,
      currentLanguage: this.state.currentLanguage,
      onAddLanguage: this.handleAddLanguage,
      onChangeLanguage: this.handleChangeLanguage,
      onChangeFrequency: this.handleChangeFrequency,
    };

    const Home = () => {
      return (
        <div>
          <div className="block" />
          <div className="container">
            <NewNavBar {...navbarProps} />
            <div className="block" />
            <ProjectsContainer projects={this.state.projects} />
          </div>
        </div>
      );
    };

    return (
      <div className="App">
        <nav className="container">
          <Link to="/">Home</Link>
          &nbsp;
          <Link to="login">Login</Link>
        </nav>
        <Router>
          <Home path="/" />
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default NewApp;
