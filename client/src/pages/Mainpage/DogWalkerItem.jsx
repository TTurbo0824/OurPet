import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const DogWalkerWrapper = styled.div`
  .dogwalker {
    cursor: pointer;
    display: inline-block;
    width: 230px;
    height: 300px;
    border: solid rgb(238, 238, 238) 0.1rem;
    margin: 0.3rem;
    background-color: white;
  }
  .dogwalker-img {
    width: 210px;
    height: 210px;
    margin: 0.5rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .dogwalker-name {
    display: flex;
    margin-left: 1rem;
    font-weight: 400;
  }
  .dogwalker-location {
    display: flex;
    margin-left: 1rem;
    font-weight: 700;
  }
`;

export default function Dogwalker({ rating, dogWalker, handleClick }) {
  console.log(rating);
  const averageRating = (rating.reduce((acc, cur) => acc + cur) / rating.length).toFixed(1);  

  return (
    <DogWalkerWrapper>
      <div className="dogwalker" key={dogWalker.id} onClick={(e) => handleClick(e)}>
        <img className="dogwalker-img" src={dogWalker.img} alt={dogWalker.name} />
        <span className="dogwalker-name" data-testid={dogWalker.name}>
          {dogWalker.name}
        </span>
        <span className="dogwalker-location">{dogWalker.locations.join(' ')}</span>
        <FontAwesomeIcon icon={faStar} size="1x" />
        <div>{averageRating} ({rating.length})</div>
      </div>
    </DogWalkerWrapper>
  );
}
