import styled from 'styled-components';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';
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
    :hover {
      background-color: ${Colors.yellow};
    }
  }
  .field-container {
    display: grid;
    padding-bottom: .1rem;
    border-bottom: 1px solid ${Colors.lightGray};
  }
  .card {
    display: grid;
    width: 87vw;
    ${media.tabletMini`width: 92vw; max-width: 40rem;`}
    grid-template-columns: 1.5rem 5.2rem 1fr 1fr 1fr;
    ${media.tabletMini`grid-template-columns: 1.5rem 5.2rem 1fr 4.8rem 4.8rem;`}
    ${media.tablet`grid-template-columns: 1.5rem 7.25rem 48% 15% 15%;`}
    ${media.tablet`width: 40rem;`}
    border-bottom: 1px solid ${Colors.lightGray};
    margin: .3rem auto;
    padding-bottom: .4rem;
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
    color: ${Colors.black};
    font-size: .85rem;
    ${media.tablet`font-size: .9rem;`}
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
    font-size: .8rem;
    ${media.tablet`font-size: .83rem;`}
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
    width: 4.5rem;
    height: 4.5rem;
    ${media.tablet`width: 6rem; height: 6rem;`}
    border: .5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .bnt {
    cursor: pointer;
    align-self: center;
    justify-self: center;
    font-size: .82rem;
    padding: .2rem 1rem;
    margin-top: .4rem;
    width: 95%;
    text-align: center;
    ${media.tabletMini`padding: .4rem; width: auto;`}
    ${media.tablet`font-size: .85rem; padding: .4rem .7rem;`}
    border: 1px solid ${Colors.mediumLightGray};
  }
`;

export const RatingView = styled.div`
  box-sizing: border-box;
  width: 17.5rem;
  height: 16.75rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: .7rem;
  box-shadow: 10px 10px grey;  
  font-size: 1rem;
  ${media.tablet`width: 19rem; height: 17.75rem;`}
  .rating-des {
    margin: 1.75rem auto .8rem;
    font-size: .95rem;
    ${media.tablet` font-size: 1rem; margin: 1.8rem auto .8rem;`}
  }
  .rating-container {
    width: 80%;
    margin: 0 auto;
  }
  .icon-container {
    color: ${Colors.lightYellow};
  }
`;

export const ReviewView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: .7rem;
  box-shadow: 10px 10px grey;
  .description {
    margin: .7rem auto .8rem;
  }
`;

export const ReviewInput = styled.textarea`
  resize: none;
  outline: none;
  width: 80%;
  height: 8rem;
  padding: .5rem;
  border-color: ${Colors.lightGray};
  font-family: 'Noto Sans KR', sans-serif;
`;

export const HistoryButton = styled.button`
  margin: 1rem .6rem .5rem;
  cursor: pointer;
  background-color: ${Colors.lightYellow};
  background-color: ${(props) => props.bntColor};
  width: 6.3rem;
  height: 2.3rem;
  border-radius: 7px;
  border: none;
  color: white;
  font-size: .85rem;
  ${media.tablet`font-size: .9rem; width: 7rem; height: 2.5rem;`}
  :hover {
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
