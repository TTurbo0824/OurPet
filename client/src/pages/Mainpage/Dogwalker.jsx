import React from 'react';
import styled from 'styled-components';

const DogWalkerWrapper = styled.div`
.dogwalker {
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

export default function Dogwalker ({ dogWalker }) {
  return (
    <DogWalkerWrapper>
      <div key={dogWalker.id} className='dogwalker'>
        <img
          className='dogwalker-img'
          src={dogWalker.img}
          alt={dogWalker.name}
        />
        <span className='dogwalker-name' data-testid={dogWalker.name}>
          {dogWalker.name}
        </span>
        <span className='dogwalker-location'>{dogWalker.locations.join(' ')}</span>
      </div>
    </DogWalkerWrapper>
  );
}
