import React, { Component } from 'react';

class Assign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      exsistingList: [7001, 7002, 7003, 7004, 7005],
      duplicatesList: [],
      actualToAddList: [],
      toEnableExsistingMode: false,
      toShowActualResult: false,
      toShowResetBtn: false
    };
  }

  handleInputChange = event => {
    this.setState({
      inputValue: /^,?\d+(,\d+)*,?$/g.test(event.currentTarget.value)
        ? event.currentTarget.value
        : this.state.inputValue
    });
  };

  clearInputField = event => {
    this.setState({ inputValue: '' });
  };

  findTheDuplicates = event => {
    let { inputValue, exsistingList } = this.state,
      userInputArray = inputValue.split(','),
      duplicates = [],
      actualToAdd = [];

    for (let i = 0, len = userInputArray.length; i < len; i++) {
      if (exsistingList.indexOf(userInputArray[i] * 1) > -1) {
        duplicates.push(userInputArray[i]);
      } else {
        actualToAdd.push(userInputArray[i]);
      }
    }

    this.setState({
      duplicatesList: [...duplicates],
      actualToAddList: [...actualToAdd],
      toShowActualResult: true,
      toShowResetBtn: true
    });
  };

  toggleExsistingList = event => {
    this.setState({
      toEnableExsistingMode: !this.state.toEnableExsistingMode
    });
  };

  handleExsistingInputChange = event => {
    this.setState({
      inputValue: /^,?\d+(,\d+)*,?$/g.test(event.currentTarget.value)
        ? // inputValue: /^\d*$/g.test(event.currentTarget.value)
          event.currentTarget.value
        : this.state.exsistingList
    });
  };

  resetAll = event => {
    this.setState({
      inputValue: '',
      duplicatesList: [],
      actualToAddList: [],
      toShowActualResult: false,
      toShowResetBtn: false
    });
  };

  render() {
    const {
      toEnableExsistingMode,
      exsistingList,
      duplicatesList,
      actualToAddList,
      inputValue,
      toShowActualResult
    } = this.state;

    return (
      <div className="Assign2-container">
        <section>
          <span>Exsisting List </span>
          {toEnableExsistingMode && (
            <textarea
              type="text"
              onChange={this.handleExsistingInputChange}
              value={exsistingList}
            />
          )}
          {!toEnableExsistingMode && <span>{exsistingList}</span>}
          <button onClick={this.toggleExsistingList}>
            {toEnableExsistingMode ? 'Done' : 'Edit'}
          </button>
        </section>

        <section>
          <span>Enter the single, multiple and range numbers</span>
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="1000, 1001, 2000-2010"
            value={inputValue}
          />
          <button onClick={this.findTheDuplicates}>Submit</button>
          <button onClick={this.clearInputField}>Clear</button>
        </section>

        {toShowActualResult && (
          <section>
            <div>
              <span>Duplicates List</span>
              <span>{duplicatesList}</span>
            </div>
            <div>
              <span>Actual To Add List</span>
              <span>{actualToAddList}</span>
            </div>
            <button onClick={this.resetAll}>Reset</button>
          </section>
        )}
      </div>
    );
  }
}

export default Assign1;
