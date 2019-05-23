import React, {Component, useState, useEffect} from 'react';
import 'bulma/css/bulma.css';
import NewNavBar from './components/Navbar/NewNavbar';
import ProjectsContainer from './components/Project/ProjectsContainer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import {Link, Router} from '@reach/router';
import {config} from './config/httpClient';

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      frequencies: ['Daily', 'Weekly', 'Monthly'],
      projects: [],
      currentLanguage: '',
      loggedIn: false,
      frequency: '',
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleAddLanguage = this.handleAddLanguage.bind(this);
    this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
  }

  componentDidMount() {
    const user = this.isLoggedIn();
    console.log(user);
    if (user) {
      this.setState({
        loggedIn: true,
        languages: user.languages
          ? user.languages.toLowerCase().split(',')
          : [],
        frequency: user.frequency ? user.frequency.toLowerCase() : 'Daily',
        currentLanguage: user.favorite_language
          ? user.favorite_language.toLowerCase()
          : '',
      });
      if (user.favorite_language) {
        this.fetchRepos(user.favorite_language.toLowerCase());
      }
    } else {
      console.log('Not logged!');
    }
  }

  isLoggedIn() {
    return (
      localStorage.getItem('user') !== 'undefined' &&
      localStorage.getItem('token') !== 'undefined' &&
      localStorage.getItem('user') !== null &&
      localStorage.getItem('token') !== null
    );
  }

  fetchRepos(language, frequency = 'Daily') {
    const url = `repositories?language=${language.toLowerCase()}&since=${frequency.toLowerCase()}`;
    config.githubAPI
      .get(url)
      .then(response => {
        this.setState({projects: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeLanguage(language) {
    this.setState({currentLanguage: language});
    this.fetchRepos(language);
  }

  handleAddLanguage(language) {
    this.setState({languages: [...this.state.languages, language]});
  }

  handleChangeFrequency(frequency) {
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
      return <div>Home</div>;
    };

    const Projects = () => {
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

    const BookmarkedProjects = () => {
      const id = JSON.parse(localStorage.getItem('user')).id;
      const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

      const fetchBookmarkedProjects = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        config.appAPI.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
        const url = `users/${id}/bookmarked_projects`;
        return config.appAPI.get(url);
      };

      useEffect(() => {
        let isSubscribed = true;
        fetchBookmarkedProjects()
          .then(response =>
            isSubscribed ? setBookmarkedProjects(response.data) : null,
          )
          .catch(error => (isSubscribed ? console.log(error) : null));

        return () => (isSubscribed = false);
      }, []);

      return (
        <div className="container">
          <div className="block" />
          <ProjectsContainer projects={bookmarkedProjects} />
        </div>
      );
    };

    const Hero = () => {
      return (
        <section class="hero is-small is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Trending Repos</h1>
              <h2 class="subtitle">Explore interesting projects @ GitHub</h2>
            </div>
          </div>
        </section>
      );
    };

    return (
      <div className="App">
        <Hero />
        <div className="block" />
        <nav className="container">
          {this.state.loggedIn ? (
            <div>
              <Link className="button is-light" to="projects">
                Browse
              </Link>
              <Link className="button is-light" to="bookmarked_projects">
                My Bookmarked Projects
              </Link>
            </div>
          ) : (
            <div>
              <Link className="button is-light" to="login">
                Sign in
              </Link>
              <Link className="button is-light" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </nav>
        <Router>
          <Login path="/login" />
          <Signup path="/signup" />
          <Projects path="/" />
          <BookmarkedProjects path="/bookmarked_projects" />
        </Router>
      </div>
    );
  }
}

export default NewApp;
