import React, { Component } from 'react';
import jsonData from '../data';
import Card from './Card';
import '../css/Assign_2.css';
console.log('data', jsonData);
class Assign2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: null,
      isLoaded: true,
      error: false
    };
  }

  componentDidMount() {
    let apiData = {
      url: 'https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs',
      configData: {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'cache-control': 'no-cache',
          redirect: 'follow',
          referrer: 'no-referrer'
        }
      }
    };

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open(
      'GET',
      'https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs'
    );
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader(
      'postman-token',
      'a03a6084-b1c1-5249-de2d-202227dd688e'
    );

    xhr.send(data);
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

  render() {
    const { error, isLoaded } = this.state,
      cardsData = jsonData[1],
      Cards = Object.keys(cardsData).map((key, index) => {
        return <Card key={index} cardData={cardsData[key]} />;
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
              <button className="coming-soon-btn left-btns" onClick={this.comingSoon}>
                Coming Soon
              </button>
              <button className="now-showing-btn left-btns" onClick={this.nowShowing}>
                Now Showing
              </button>
            </div>
            <div className="right-header-section">
                <select className="right-dropdwons">
                  <option>1</option>
                  <option>2</option>
                </select>
              <select className="right-dropdwons">
                  <option>1</option>
                  <option>2</option>
                </select>
                <select className="right-dropdwons">
                  <option>1</option>
                  <option>2</option>
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
