import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ cardData }) => {
  const dateArray = cardData.ShowDate.split(',')[0].split(' ');
  return (
    <div className="event-card">
      <a className="card-anchor" href={cardData.TrailerURL}>
        <div className="img-container">
          <img
            src={`https://in.bmscdn.com/events/moviecard/${
              cardData.EventCode
            }.jpg`}
            alt={cardData.EventImageCode}
          />
          <div className="date-and-play-container">
            <div className="date">
              <span>{dateArray[0]}</span>
              <span>{dateArray[1]}</span>
            </div>
            <div className="play-btn" />
          </div>
        </div>
        <div className="votes-and-like-section">
          <span className="top-section">
            <span className="like-icon">{}</span>
            <span className="like-percentage">{cardData.wtsPerc}%</span>
          </span>
          <span className="bottom-section">
            <span className="votes-count-and-text">{cardData.wtsCount}</span>
            <span>votes</span>
          </span>
        </div>
        <div className="event-name">{cardData.EventName}</div>
      </a>
    </div>
  );
};

Card.propTypes = {
  cardData: PropTypes.object
};

export default Card;
