import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './css/App.css';
import Assign1 from './components/Assign1';
import Assign2 from './components/Assign2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 0
    };
  }

  handleChange = event => {
    this.setState({ selectedOption: event.currentTarget.value * 1 });
  };

  moveToLandingPage = event => {
    this.setState({ selectedOption: 0 });
  };

  render() {
    const { selectedOption } = this.state,
      mainOptions = ['-- Select --', 'Option1', 'Option2'].map(
        (item, index) => {
          return (
            <option key={index} value={index}>
              {item}
            </option>
          );
        }
      );

    return (
      <div className="App">
        {selectedOption ? (
          <button onClick={this.moveToLandingPage}>Back to Landing Page</button>
        ) : (
          ''
        )}
        {!selectedOption && (
          <section className="options-container">
            <span>Select the options</span>
            <select value={selectedOption} onChange={this.handleChange}>
              {mainOptions}
            </select>
          </section>
        )}
        {selectedOption === 1 && <Assign1 />}
        {selectedOption === 2 && <Assign2 />}
      </div>
    );
  }
}

// App.propTypes = {};

export default App;
