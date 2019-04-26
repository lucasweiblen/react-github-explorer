import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import AddLanguageFormWithHooks from './components/AddLanguageFormWithHooks';
import Explorer from './components/Explorer';
import Tab from './components/Tab';

const languages = ['Clojure', 'Elixir', 'Go', 'Rust', 'Javascript'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {languages: languages};
    this.handleAddNewLanguage = this.handleAddNewLanguage.bind(this);
  }

  handleAddNewLanguage({language}) {
    console.log(`App component -> add new language -> ${language}`);
    let newLanguages = [...this.state.languages];
    newLanguages.push(language);
    this.setState({languages: newLanguages});
  }

  render() {
    return (
      <div className="App">
        <AddLanguageFormWithHooks
          addLanguageHandler={this.handleAddNewLanguage}
        />
        <br />
        <Explorer languages={this.state.languages} />
      </div>
    );
  }
}

export default App;
