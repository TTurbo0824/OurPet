import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const DogWalkerWrapper = styled.div`
  .dogwalker {
    cursor: pointer;
    display: inline-block;
    width: 14.5rem;
    border: solid rgb(238, 238, 238) 0.1rem;
    margin: 0.3rem;
    padding: 0.5rem;
    background-color: white;
  }
  .dogwalker-img {
    width: 13.25rem;
    height: 13.25rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .dogwalker-name {
    display: flex;
    font-weight: 400;
  }
  .dogwalker-location {
    display: flex;
    font-weight: 700;
  }
  .rating-container {
    display: flex;
    align-items: center;
  }
`;

export default function Dogwalker ({ rating, minPrice, dogWalker, handleClick }) {
  let walkerRating = rating.filter((el) => el.id === dogWalker.id);
  walkerRating = walkerRating[0].rating;
  const averageRating = (walkerRating.reduce((acc, cur) => acc + cur) / walkerRating.length).toFixed(1);

  return (
    <DogWalkerWrapper>
      <div className='dogwalker' key={dogWalker.id} onClick={(e) => handleClick(e)}>
        <img className='dogwalker-img' src={dogWalker.img} alt={dogWalker.name} />
        <span className='dogwalker-name' data-testid={dogWalker.name}>
          {dogWalker.name} {dogWalker.id}
        </span>
        <span className='dogwalker-location'>{dogWalker.locations.join(' ')}</span>
        <div className='rating-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <div>{averageRating} ({rating.length})</div>
        </div>
        <div>₩{minPrice}+</div>
      </div>
    </DogWalkerWrapper>
  );
}
