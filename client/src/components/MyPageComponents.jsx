import styled from 'styled-components';
import { Colors } from './utils/_var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons';

export const MyPageTable = styled.div`
  .no-items {
    text-align: center;
    margin: 2.5rem auto 2rem;
    white-space: pre-line;
  }
  .search-bnt {
    display: flex;
    margin: auto;
    padding: .75rem 1.25rem;
    cursor: pointer;
    background-color: ${Colors.lightYellow};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: .9rem;
    &:hover {
      background-color: ${Colors.yellow};
    }
  }
  .field-container {
    display: grid;
    padding-bottom: .1rem;
    border-bottom: 1px solid ${Colors.lightGray};
    width: 40rem;
  }
  .card {
    display: grid;
    grid-template-columns: 1.5rem 7.25rem 48% 15% 15%;
    border-bottom: 1px solid ${Colors.lightGray};
    margin: .3rem auto;
    padding-bottom: .4rem;
    width: 40rem;
  }
  .name {
    grid-area: title;
  }
  .info {
    grid-area: info;
  }
  .type {
    grid-area: type;
  }
  .name, .info, .type {
    font-size: .9rem;
  }
  .select-all {
    align-self: center;
  }
  .select-all, .select-one {
    cursor: pointer;
  }
  .select-one {
    grid-area: check;
  }
  .all {
    display: flex;
    grid-area: alls;
  }
  .select {
    grid-area: select;
    padding-right: .4rem;
  }
  .description {
    margin-left: .3rem;
    font-size: .83rem;
    color: ${Colors.darkGray};
    align-self: center;
    padding-bottom: .15rem;
  }
  .delete-bnt {
    cursor: pointer;
    display: flex;
    margin-right: 0;
    margin-left: auto;
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 6rem;
    height: 6rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .bnt {
    cursor: pointer;
    align-self: center;
    justify-self: center;
    padding: .4rem .7rem;
    font-size: .85rem;
    border: 1px solid ${Colors.mediumLightGray};
  }
`;

export const ReviewView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
  .description {
    margin: .7rem auto 0.8rem;
  }
`;

export const ReviewInput = styled.textarea`
  resize: none;
  outline: none;
  width: 80%;
  height: 8rem;
  padding: 0.5rem;
  border-color: ${Colors.lightGray};
  font-family: 'Noto Sans KR', sans-serif;
`;

export const HistoryButton = styled.button`
  margin: 1rem 0.6rem 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${Colors.lightYellow};
  background-color: ${(props) => props.bntColor};
  width: 7rem;
  height: 2.5rem;
  border-radius: 7px;
  border: none;
  color: white;
  &:hover {
    background-color: ${(props) => { return props.bntColor !== Colors.gray ? Colors.yellow : Colors.black; }};
  }
`;

export const options = [
  {
    value: 5,
    label: (
      <div className='icon-container'>
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
      </div>
    )
  },
  {
    value: 4,
    label: (
      <div className='icon-container'>
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        {/* <FontAwesomeIcon color={Colors.mediumLightGray} icon={faStar} size="1x" /> */}
      </div>
    )
  },
  {
    value: 3,
    label: (
      <div className='icon-container'>
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
      </div>
    )
  },
  {
    value: 2,
    label: (
      <div className='icon-container'>
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
      </div>
    )
  },
  {
    value: 1,
    label: (
      <div className='icon-container'>
        <FontAwesomeIcon icon={faStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
        <FontAwesomeIcon icon={fasStar} size='1x' />
      </div>
    )
  }
];

export const ProfileImage = styled.div`
  width: 9.75rem;
  height: 9.75rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  margin: 0 auto;
  .review-profile {
    width: 9.75rem;
    height: 9.75rem;
    object-fit: cover;
  }
`;
