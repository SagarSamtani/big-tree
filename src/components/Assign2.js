import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsonData from '../data';
import Card from './Card';
import Dropdown from './Dropdown';
import '../css/Assign_2.css';
console.log('data', jsonData);
class Assign2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: jsonData[1],
      isLoaded: true,
      error: false,
      firstFilterValue: 0,
      secondFilterValue: 'All Languages',
      thirdFilterValue: 'All Generes',
      currentPlayingEvent: null,
      mType: 'cs'
    };
  }

  componentDidMount() {
    this.getAPIData();
  }

  getAPIData = () => {
    // let apiData = {
    //   url: `https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=${
    //     this.state.mType
    //   }`,
    //   configData: {
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'cache-control': 'no-cache',
    //       redirect: 'follow',
    //       referrer: 'no-referrer'
    //     }
    //   }
    // };
    // fetch(apiData.url, apiData.configData)
    //   .then(response => {
    //     console.log('res', response);
    //   })
    //   .then(
    //     result => {
    //       this.setState({
    //         isLoaded: true,
    //         cardsData: result
    //       });
    //     },
    //     // error handling
    //     error => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   );
  };

  getOptions = optionsArray => {
    return optionsArray.map((item, index) => {
      return (
        <option value={item} key={index}>
          {item}
        </option>
      );
    });
  };

  handleSelectChange = (filterOrder, event) => {
    this.setState(
      {
        [`${filterOrder}FilterValue`]: event.target.value
      },
      this.filterTheCardsData
    );
  };

  getOptionsForThrirdFilter = () => {
    console.log('jsonData', jsonData);
    let eventsData = this.state.cardsData,
      allGeneres = ['All Generes'];
    for (let key in eventsData) {
      const eventGenere = eventsData[key].EventGenre.split('|');
      for (let i = 0, len = eventGenere.length; i < len; i++) {
        !(allGeneres.indexOf(eventGenere[i]) > -1) &&
          allGeneres.push(eventGenere[i]);
      }
    }
    return this.getOptions(allGeneres);
  };

  filterTheCardsData = () => {
    let filteredResult = [],
      { secondFilterValue, thirdFilterValue } = this.state;

    if (
      secondFilterValue === 'All Languages' &&
      thirdFilterValue === 'All Generes'
    ) {
      this.setState({ cardsData: jsonData[1] });
    } else {
      const eventsData = jsonData[1];
      for (let key in eventsData) {
        ((secondFilterValue === eventsData[key].EventLanguage &&
          thirdFilterValue === 'All Generes') ||
          (secondFilterValue === 'All Languages' &&
            eventsData[key].EventGenre.split('|').indexOf(thirdFilterValue) >
              -1) ||
          (secondFilterValue === eventsData[key].EventLanguage &&
            eventsData[key].EventGenre.split('|').indexOf(thirdFilterValue) >
              -1)) &&
          filteredResult.push(eventsData[key]);
      }
      this.setState({ cardsData: [...filteredResult] });
    }
  };

  getDropdownOptions = type => {
    switch (type) {
      case 'first':
        return this.getOptions(['Popular', 'Fresh']);
      case 'second':
        return this.getOptions(jsonData[0]);
      case 'third':
        return this.getOptionsForThrirdFilter();
      default:
        break;
    }
  };

  setCurrentPlayingEvent = currentPlayingEvent => {
    this.setState({ currentPlayingEvent });
  };

  changeMtype = mType => {
    this.setState({ mType }, this.getAPIData);
  };

  getEventGenere = eventGenre => {
    return eventGenre.split('|').map(eg => {
      return <div className="event-genre-tags">{eg}</div>;
    });
  };

  render() {
    const {
        cardsData,
        currentPlayingEvent,
        error,
        isLoaded,
        mType
      } = this.state,
      { moveToLandingPage } = this.props,
      Cards = Object.keys(cardsData).map((key, index) => {
        return (
          <Card
            key={index}
            cardData={cardsData[key]}
            setCurrentPlayingEvent={this.setCurrentPlayingEvent}
          />
        );
      }),
      allDropDowns = ['first', 'second', 'third'].map((item, index) => {
        return (
          <Dropdown
            handleSelectChange={this.handleSelectChange}
            key={index}
            options={this.getDropdownOptions(item)}
            type={item}
            value={this.state[`${item}FilterValue`]}
          />
        );
      });

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="trailer-header">
            <div className="left-header-section">
              <button
                className={`left-btns ${
                  mType === 'cs' ? 'btn-active' : 'btn-inactive'
                }`}
                onClick={() => {
                  this.changeMtype('cs');
                }}>
                Coming Soon
              </button>
              <button
                className={`left-btns ${
                  mType === 'ns' ? 'btn-active' : 'btn-inactive'
                }`}
                onClick={() => {
                  this.changeMtype('ns');
                }}>
                Now Showing
              </button>
            </div>
            <div className="right-header-section">
              {allDropDowns}
              <div className="close-entity" onClick={moveToLandingPage}>
                &#10005;
              </div>
            </div>
          </div>
          {currentPlayingEvent && (
            <div className="trailer-running-container">
              <div className="playing-trailer">
                <iframe
                  title="hi"
                  id="hi"
                  className="video-container"
                  frameBorder="0"
                  src={`${currentPlayingEvent.TrailerURL}`}
                />
              </div>
              <div className="event-details-container">
                <div className="rs-event-title">
                  {currentPlayingEvent.EventTitle}
                </div>
                <div className="rs-event-language">
                  {currentPlayingEvent.EventLanguage}
                </div>
                <div className="rs-event-genre">
                  {this.getEventGenere(currentPlayingEvent.EventGenre)}
                </div>
                <div className="rs-votes-and-like-section">
                  <span className="like-icon">{}</span>
                  <span className="rs-top-section">
                    <span className="like-percentage">
                      {currentPlayingEvent.wtsPerc}%
                    </span>
                  </span>
                  <span className="rs-bottom-section">
                    <span className="votes-count-and-text">
                      {currentPlayingEvent.wtsCount}
                    </span>
                    <span>votes</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="cards-container">{Cards}</div>
        </div>
      );
    }
  }
}

Assign2.propTypes = {
  moveToLandingPage: PropTypes.func
};

export default Assign2;
