import React, {Component} from 'react';

class AddLanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {language: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({language: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`Add new language: ${this.state.language}`);
    this.props.addLanguageHandler({language: this.state.language});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.language}
          placeholder="Add new language"
          onChange={this.handleChange}
        />
        &nbsp;&nbsp;
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddLanguageForm;
