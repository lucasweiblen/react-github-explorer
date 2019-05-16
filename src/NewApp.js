import React, {Component, useState, useEffect} from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import NewNavBar from './components/NewNavbar';
import ProjectsContainer from './components/ProjectsContainer';
//import {languages, frequencies, projects} from './const';
import Login from './components/Login';
import {Link, Router} from '@reach/router';

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      frequencies: ['Daily'],
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
    //this will be fetched only if user is logged in
    const user = this.isLoggedIn();
    if (user !== null) {
      this.setState({
        loggedIn: true,
        languages: user.languages.toLowerCase().split(','),
        frequency: user.frequency.toLowerCase(),
        currentLanguage: user.favorite_language.toLowerCase(),
      });
      if (user.favorite_language) {
        this.fetchRepos(user.favorite_language.toLowerCase());
      }
    } else {
      console.log('Not logged!');
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('user') !== null) {
      const data = localStorage.getItem('user');
      const userData = JSON.parse(data);
      this.setState({loggedIn: true});
      return userData;
    } else {
      this.setState({loggedIn: false});
      return null;
    }
  }

  fetchRepos(language, frequency = 'Daily') {
    //console.log(`Fetching repos for ${language}, frequency: ${frequency}`);
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
    //console.log(`NewApp -> language: ${language}`);
    this.setState({currentLanguage: language});
    this.fetchRepos(language);
  }

  handleAddLanguage(language) {
    //console.log(`NewApp -> language: ${language}`);
    this.setState({languages: [...this.state.languages, language]});
  }

  handleChangeFrequency(frequency) {
    //console.log(`NewApp -> frequency: ${frequency}`);
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

    const BookmarkedProjects = props => {
      const id = props.id || 3;
      const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

      const fetchBookmarkedProjects = () => {
        const url = `http://localhost:1323/users/${id}/bookmarked_projects`;
        return axios.get(url);
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

    return (
      <div className="App">
        <nav className="container">
          {this.state.loggedIn ? (
            <div>
              <Link className="button" to="/">
                Home
              </Link>
              <Link className="button" to="projects">
                Browse
              </Link>
              <Link className="button" to="bookmarked_projects">
                My Bookmarked Projects
              </Link>
            </div>
          ) : (
            <Link className="button" to="login">
              Login
            </Link>
          )}
        </nav>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Projects path="/projects" />
          <BookmarkedProjects path="/bookmarked_projects" />
        </Router>
      </div>
    );
  }
}

export default NewApp;
