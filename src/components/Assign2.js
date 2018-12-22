import React, { Component } from 'react';
import jsonData from '../data';
import Card from './Card';
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
      thirdFilterValue: 'All Generes'
    };
  }

  componentDidMount() {
    // let apiData = {
    //   url: 'https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs',
    //   configData: {
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'text/html; charset=UTF-8',
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
  }

  getOptions = (optionsArray) => {
    return optionsArray.map((item , index)=> {
        return <option value={item} key={index}>{item}</option>;
    });
  };

  handleSelectChange = (filterOrder, event) => {
    this.setState({
      [`${filterOrder}FilterValue`]: event.target.value,
    }, this.filterTheCardsData);
  };

  getOptionsForThrirdFilter = () => {
    console.log('jsonData', jsonData);
    let eventsData = this.state.cardsData, allGeneres = ['All Generes'];
    for(let key in eventsData) {
      const eventGenere = eventsData[key].EventGenre.split('|');
      for(let i=0,len=eventGenere.length; i<len; i++){
        !(allGeneres.indexOf(eventGenere[i]) > -1) 
        && allGeneres.push(eventGenere[i]);
      }
    }
    return this.getOptions(allGeneres);
  };

  filterTheCardsData = () => {
    let filteredResult = [],
    { secondFilterValue, thirdFilterValue } = this.state;

    if(secondFilterValue === 'All Languages' && thirdFilterValue === 'All Generes'){
      this.setState({cardsData: jsonData[1]});
    } else {
      const eventsData = jsonData[1];
      for(let key in eventsData) {
        ((secondFilterValue === eventsData[key].EventLanguage && thirdFilterValue === 'All Generes')
        || (secondFilterValue === 'All Languages' && eventsData[key].EventGenre.split('|').indexOf(thirdFilterValue) > -1)
        || (secondFilterValue === eventsData[key].EventLanguage && eventsData[key].EventGenre.split('|').indexOf(thirdFilterValue) > -1))
        && filteredResult.push(eventsData[key]);
        
      }
      this.setState({cardsData: [...filteredResult]});
    }
  };

  render() {
    const { cardsData, error, isLoaded, firstFilterValue, secondFilterValue, thirdFilterValue } = this.state,
      Cards = Object.keys(cardsData).map((key, index) => {
        return <Card key={index} cardData={cardsData[key]} />;
      }),
      firstFilterOptions = this.getOptions(['Popular', 'Fresh']),
      secondFilterOptions = this.getOptions(jsonData[0]),
      thirdFilterOptions = this.getOptionsForThrirdFilter();
      
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="trailer-header">
            <div className="left-header-section">
              <button className="coming-soon-btn left-btns" onClick={this.comingSoon}>
                Coming Soon
              </button>
              <button className="now-showing-btn left-btns" onClick={this.nowShowing}>
                Now Showing
              </button>
            </div>
            <div className="right-header-section">
                <select value={firstFilterValue} className="right-dropdwons" onChange={event=>{this.handleSelectChange('first', event)}}>
                  {firstFilterOptions}
                </select>
                <select value={secondFilterValue} className="right-dropdwons" onChange={event=>{this.handleSelectChange('second', event)}}>
                  {secondFilterOptions}
                </select>
                <select value={thirdFilterValue} className="right-dropdwons" onChange={event=>{this.handleSelectChange('third', event)}}>
                  {thirdFilterOptions}
                </select>
            </div>
          </div>
          <div className="cards-container">{Cards}</div>
        </div>
      );
    }
  }
}

export default Assign2;
