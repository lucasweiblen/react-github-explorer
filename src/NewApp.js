import React, {Component, useState} from 'react';
import 'bulma/css/bulma.css';
//import AddLanguageFormWithHooks from './components/AddLanguageFormWithHooks';
//import Explorer from './components/Explorer';

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

  const handleSubmit = e => {
    if (language !== '') {
      console.log(`AddLanguageForm -> adding new language: ${language}`);
      addLanguageHandler({language});
      e.preventDefault();
    }
  };

  return (
    <div className="level-left">
      <div className="level-item">
        <div className="field has-addons">
          <form onSubmit={handleSubmit}>
            <p className="control">
              <input
                className="input"
                type="text"
                value={language}
                onChange={handleChange}
                placeholder="Add new language"
              />
              <button type="submit" className="button is-outlined">
                <i className="fas fa-plus" />
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

function LanguagesContainer({languages, current}) {
  const [langs, setLanguages] = useState(languages);
  const [curr, setCurrent] = useState(current);

  const handleAddNewLanguage = ({language}) => {
    console.log(`LanguagesContainer -> adding new language ${language}`);
    setLanguages([...languages, language]);
  };

  const handleCurrLanguage = e => {
    console.log(e.target.textContent);
    setCurrent(e.target.textContent);
  };

  const _langs = langs.map((val, key) => {
    return (
      <button
        className={curr === val ? 'button is-active' : 'button'}
        key={key}
        onClick={handleCurrLanguage}>
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

function FrequencyContainer({frequencies, current}) {
  const freq = frequencies.map((val, key) => {
    return (
      <p key={key} className="level-item">
        <button
          className={
            current === val
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
  return (
    <nav className="level">
      <LanguagesContainer languages={props.languages} current="Clojure" />
      <FrequencyContainer frequencies={props.frequencies} current="Daily" />
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
    };
    this.handleAddNewLanguage = this.handleAddNewLanguage.bind(this);
    this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
  }

  handleAddNewLanguage() {}

  handleChangeFrequency() {}

  render() {
    const navbarProps = {
      languages: this.state.languages,
      frequencies: this.state.frequencies,
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
