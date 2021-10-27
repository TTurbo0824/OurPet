import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DogWalkerPageWrapper = styled.div`
  .main {
    display: flex;
    /* height: 800rem; */
    min-height: calc(100vh - 10.9rem);
  }
  .dogwalker-img {
    width: 210px;
    height: 210px;
    margin: 0.5rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
`;

const DogWalkerPage = ({ modal, handleMessage, handleNotice }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // console.log('main page');
  }, [location]);

  const dogWalkerList = useSelector((state) => state.dogwalker).dogWalkers;
  const dogWalkerId = Number(location.pathname.split('id=')[1]);
  let dogWalker = dogWalkerList.filter((dogwalker) => dogwalker.id === dogWalkerId);
  dogWalker = dogWalker[0];
  console.log(dogWalker);
  // console.log('🥺🥺🥺🥺🥺🥺🥺🥺🥺');

  return (
    <DogWalkerPageWrapper>
      <div className='main'>
        <img className='dogwalker-img' src={dogWalker.img} alt={dogWalker.name} />
        <div>{dogWalker.name}</div>
        <div>{dogWalker.tags}</div>
        <div>{dogWalker.locations}</div>
        {/* <div>{dogWalker.charges}</div> */}
      </div>
    </DogWalkerPageWrapper>
  );
};

export default DogWalkerPage;
