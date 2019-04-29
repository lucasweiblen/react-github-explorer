import React, {Component} from 'react';
import 'bulma/css/bulma.css';
//import AddLanguageFormWithHooks from './components/AddLanguageFormWithHooks';
//import Explorer from './components/Explorer';

const languages = ['Clojure', 'Elixir', 'Go', 'Rust'];
const frequencies = ['Daily', 'Weekly', 'Monthly'];

function AddNewLangForm() {
  return (
    <div class="level-left">
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Add new language" />
          </p>
          <p class="control">
            <button class="button is-outlined">
              <i class="fas fa-plus" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function LanguagesContainer({languages, current}) {
  const langs = languages.map((val, key) => {
    return (
      <a
        class={current === val ? 'button is-active' : 'button'}
        href="#"
        key={key}>
        {val}
      </a>
    );
  });

  return <div>{langs}</div>;
}

function FrequencyContainer({frequencies, current}) {
  const freq = frequencies.map((val, key) => {
    return (
      <p class="level-item">
        <a
          class={
            current === val
              ? 'button is-small is-rounded is-active'
              : 'button is-small is-rounded'
          }
          href="#"
          key={key}>
          {val}
        </a>
      </p>
    );
  });

  return <div class="level-right">{freq}</div>;
}

function ProjectHeader({name}) {
  return <p class="title">{name}</p>;
}

function ProjectContent({project}) {
  return (
    <div>
      <p>
        <span>
          <i class="far fa-user" />
        </span>
        &nbsp;&nbsp;
        <span>{project.author}</span>
      </p>
      <p>
        <span>
          <i class="devicon-go-line colored" />
        </span>
        &nbsp;&nbsp;
        <span>{project.language}</span>
      </p>
      <p>
        <span>
          <i class="fas fa-link" />
        </span>
        &nbsp;&nbsp;
        <span>
          <a href="foobar.com">{project.url}</a>
        </span>
      </p>
      <p>
        <span>
          &nbsp;&nbsp;
          <i class="far fa-star" />
        </span>
        <span>{project.stars}</span>
      </p>
    </div>
  );
}

function ProjectFooter() {
  return (
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          <a href="">
            <i class="fas fa-heart" />
          </a>
        </span>
        &nbsp; &nbsp;
        <span>
          <a href="">
            <i class="fas fa-trash" />
          </a>
        </span>
      </p>
    </footer>
  );
}

function Project() {
  const _project = {
    author: 'Foobar',
    language: 'Go',
    url: 'http://www.foobar.com',
    stars: 900,
  };

  return (
    <div class="column">
      <div class="card">
        <div class="card-content">
          <ProjectHeader name="Trendcat" />
          <ProjectContent project={_project} />
        </div>
        <ProjectFooter />
      </div>
    </div>
  );
}

function ProjectsContainer() {
  return (
    <div class="columns">
      <Project />
      <Project />
    </div>
  );
}

function MainNavbar() {
  return (
    <nav class="level">
      <AddNewLangForm />
      <LanguagesContainer languages={languages} current="Clojure" />
      <FrequencyContainer frequencies={frequencies} current="Daily" />
    </nav>
  );
}

class NewApp extends Component {
  render() {
    return (
      <div className="App">
        <div className="block" />
        <div className="container">
          <MainNavbar />
          <div class="block" />
          <ProjectsContainer />
        </div>
      </div>
    );
  }
}

export default NewApp;
