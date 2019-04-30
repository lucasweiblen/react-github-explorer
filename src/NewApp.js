import React, {Component, useState} from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';

const languages = ['Clojure', 'Elixir', 'Go', 'Rust'];
const frequencies = ['Daily', 'Weekly', 'Monthly'];
const projects = [
  {
    name: 'Trendcat',
    author: 'Foobar',
    language: 'Go',
    url: 'http://www.foobar.com',
    stars: 900,
  },
  {
    name: 'Football Maniacs',
    author: 'Baz',
    language: 'Clojure',
    url: 'http://www.clojure.com',
    stars: 10,
  },
];

const AddLanguageForm = ({addLanguageHandler}) => {
  const [language, setLanguage] = useState('');

  const handleChange = e => {
    setLanguage(e.target.value);
  };

  const handleClick = e => {
    if (language !== '') {
      console.log(`AddLanguageForm -> adding new language: ${language}`);
      addLanguageHandler({language});
    }
  };

  return (
    <div className="level-left">
      <div className="level-item">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              value={language}
              onChange={handleChange}
              placeholder="Add new language"
            />
          </div>
          <div className="control">
            <button onClick={handleClick} className="button is-outlined">
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function LanguagesContainer({
  languages,
  current,
  onChangeLanguage,
  onAddLanguage,
}) {
  const [langs, setLanguages] = useState(languages);
  const [curr, setCurrent] = useState(current);

  const handleAddNewLanguage = ({language}) => {
    console.log(`LanguagesContainer -> adding new language ${language}`);
    setLanguages([...langs, language]);
    onAddLanguage(language); // need to check later if its necessary or not
  };

  const handleCurrentLanguage = e => {
    console.log(e.target.textContent);
    setCurrent(e.target.textContent);
    onChangeLanguage(e.target.textContent);
  };

  const _langs = langs.map((val, key) => {
    return (
      <button
        className={curr === val ? 'button is-active' : 'button'}
        key={key}
        onClick={handleCurrentLanguage}>
        {val}
      </button>
    );
  });

  return (
    <div>
      <AddLanguageForm addLanguageHandler={handleAddNewLanguage} />
      {_langs}
    </div>
  );
}

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

function ProjectHeader({name}) {
  return <p className="title">{name}</p>;
}

function ProjectContent({project}) {
  return (
    <div>
      <p>
        <span>
          <i className="far fa-user" />
        </span>
        &nbsp;&nbsp;
        <span>{project.author}</span>
      </p>
      <p>
        <span>
          <i className="devicon-go-line colored" />
        </span>
        &nbsp;&nbsp;
        <span>{project.language}</span>
      </p>
      <p>
        <span>
          <i className="fas fa-link" />
        </span>
        &nbsp;&nbsp;
        <span>
          <a href="foobar.com">{project.url}</a>
        </span>
      </p>
      <p>
        <span>
          <i className="far fa-star" />
        </span>
        &nbsp;&nbsp;
        <span>{project.stars}</span>
      </p>
    </div>
  );
}

function ProjectFooter() {
  return (
    <footer className="card-footer">
      <p className="card-footer-item">
        <span>
          <button>
            <i className="fas fa-heart" />
          </button>
        </span>
        &nbsp; &nbsp;
        <span>
          <button>
            <i className="fas fa-trash" />
          </button>
        </span>
      </p>
    </footer>
  );
}

function Project(project) {
  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <ProjectHeader name={project.name} />
          <ProjectContent project={project} />
        </div>
        <ProjectFooter />
      </div>
    </div>
  );
}

function ProjectsContainer({projects}) {
  const _projects = projects.map((project, key) => {
    return <Project key={key} {...project} />;
  });

  return <div className="columns">{_projects}</div>;
}

function MainNavbar(props) {
  const handleChangeLanguage = language => {
    console.log(`MainNavBar -> language: ${language}`);
    props.onChangeLanguage(language);
  };

  const handleAddLanguage = language => {
    console.log(`MainNavBar -> language: ${language}`);
    props.onAddLanguage(language);
  };

  const handleChangeFrequency = frequency => {
    console.log(`MainNavBar -> frequency: ${frequency}`);
    props.onChangeFrequency(frequency);
  };

  return (
    <nav className="level">
      <LanguagesContainer
        onChangeLanguage={handleChangeLanguage}
        onAddLanguage={handleAddLanguage}
        languages={props.languages}
        current="Clojure"
      />
      <FrequencyContainer
        onChangeFrequency={handleChangeFrequency}
        frequencies={props.frequencies}
        current="Daily"
      />
    </nav>
  );
}

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: languages,
      frequencies: frequencies,
      projects: projects,
      currentLanguage: '',
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleAddLanguage = this.handleAddLanguage.bind(this);
    this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
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
    //console.log(this.state.languages);
    //this.setState({languages: []});
    //console.log(this.state.languages);
  }

  handleChangeFrequency(frequency) {
    console.log(`NewApp -> frequency: ${frequency}`);
    this.fetchRepos(this.state.currentLanguage, frequency);
  }

  render() {
    const navbarProps = {
      languages: this.state.languages,
      frequencies: this.state.frequencies,
      onAddLanguage: this.handleAddLanguage,
      onChangeLanguage: this.handleChangeLanguage,
      onChangeFrequency: this.handleChangeFrequency,
    };

    return (
      <div className="App">
        <div className="block" />
        <div className="container">
          <MainNavbar {...navbarProps} />
          <div className="block" />
          <ProjectsContainer projects={this.state.projects} />
        </div>
      </div>
    );
  }
}

export default NewApp;
