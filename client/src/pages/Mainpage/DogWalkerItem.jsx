import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { media } from '../../components/utils/_media';
import { Colors } from '../../components/utils/_var';
const DogWalkerWrapper = styled.div`
  .dogwalker-card {
    cursor: pointer;
    display: grid;
    grid-template-areas:
      'img location location'
      'img nickname nickname'
      'img hl hl'
      'img tag tag'
      'img rating price';
    grid-template-columns: 30% 35% 35%;
    width: 90vw;
    max-width: 62rem;
    border: solid rgb(238, 238, 238) 0.1rem;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    margin-bottom: 2rem;
    padding: 0.5rem;
    background-color: white;
  }
  .dogwalker-img {
    grid-area: img;
    width: 13.25rem;
    height: 13.25rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .dogwalker-location {
    /* margin-top: 1rem; */
    grid-area: location;
    font-weight: 700;
  }
  .dogwalker-name {
    grid-area: nickname;
    font-weight: 400;
  }
  .h-line {
    grid-area: hl;
    height: 1rem;
    width: 100%;
    /* background-color: pink; */
    border-top: 1px solid rgb(175, 175, 175, 0.4);
  }
  .tag-container {
    grid-area: tag;
    display: flex;
    height: 3rem;
  }
  .tag {
    margin-right: .25rem;
  }
  .tag:not(:last-child)::after {
    content: '·';
    margin-left: .25rem;
  }
  .rating-container {
    grid-area: rating;
    display: flex;
    align-items: center;
    /* margin-bottom: 1rem; */
  }
  .price {
    grid-area: price;
    /* margin-bottom: 1rem; */
  }

`;

export default function Dogwalker ({ rating, minPrice, dogWalker, handleClick, tags }) {
  let walkerRating = rating.filter((el) => el.id === dogWalker.id);
  walkerRating = walkerRating[0].rating;
  const averageRating = (walkerRating.reduce((acc, cur) => acc + cur) / walkerRating.length).toFixed(1);
  // console.log(tags);
  return (
    <DogWalkerWrapper>
      <div className='dogwalker-card' key={dogWalker.id} onClick={(e) => handleClick(e)}>
        <img className='dogwalker-img' src={dogWalker.img} alt={dogWalker.name} />
        <span className='dogwalker-location'>{dogWalker.locations.join(' ')}</span>
        <span className='dogwalker-name'>
          {dogWalker.name} {dogWalker.id}
        </span>
        <div className='h-line' />
        <div className='tag-container'>
          {tags.map((el, idx) => 
            <span key={idx} className='tag'>{el}</span>
          )}
        </div>
        <div className='rating-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <div>{averageRating} ({walkerRating.length})</div>
        </div>
        <div className='price'>₩{minPrice}+</div>
      </div>
    </DogWalkerWrapper>
  );
}
