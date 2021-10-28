import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Dogwalker from './DogWalkerItem';
import { Colors } from '../../components/utils/_var';

export const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
  }
  input:focus {
    outline: none;
  }
  .top-container {
    width: 100vw;
    padding: 0 .5rem;
    display: grid;
    grid-template-areas: 
    'location date'
    'tag tag';
    grid-template-columns: 50% 50%;
    /* background-color: pink; */
  }
  .location-container {
    grid-area: location;
  }
  .location-container input {
    width: 21rem;
    height: 2rem;
    padding: 0 0.4rem;
    border: 1px solid ${Colors.mediumGray};
  }
  .date-container {
    grid-area: date;
    margin-bottom: 1rem;
  }
  .tag-container {
    grid-area: tag;
  }
  .bottom-container {
    display: flex;
    margin-top: 2rem;
  }
  .description {
    margin-bottom: .5rem;
  }
`;

const Tag = styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.4rem 0.2rem 0;
  padding: .05rem 1rem .2rem ;
  border: solid 1px;
  border-color: ${(props) => props.borderColor};
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 2rem;
  padding: 0 0.4rem;
  background-color: white;
  border: 1px solid ${Colors.mediumGray};

  input {
    border: none;
    margin: 0 0.3rem 0.35rem;
    color: ${Colors.darkGray};
  }
`;

function Mainpage () {
  const history = useHistory();
  let dogWalkers = useSelector((state) => state.dogwalker).dogWalkers;
  // console.log(dogWalkers);

  const [startDate, setStartDate] = useState(new Date());

  const allTagList = [
    '소형견',
    '중형견',
    '대형견',
    '야외 배변',
    '산책 후 뒤처리',
    '산책 예절 교육'
  ];

  const [allTags, setAllTags] = useState({
    소형견: false,
    중형견: false,
    대형견: false,
    '야외 배변': false,
    '산책 후 뒤처리': false,
    '산책 예절 교육': false
  });

  const handleTagClick = (tag) => {
    console.log(tag);
    if (allTags[tag] === false) {
      setAllTags({
        ...allTags,
        [tag]: true
      });
    } else {
      setAllTags({
        ...allTags,
        [tag]: false
      });
    }
  };

  const tags = [];

  for (const key in allTags) {
    if (allTags[key]) {
      tags.push(key);
    }
  }

  // dogWalkers = dogWalkers.filter((dogWalker) => dogWalker.locations.includes('종로구'));
  
  const tagChecker = (arr, target) => target.every((el) => arr.includes(el));

  dogWalkers = dogWalkers.filter((dogWalker) => {
    if (tagChecker(dogWalker.tags, tags)) return dogWalker;
  });

  const handleClick = (dogwalker) => {
    history.push({ pathname: `/dogwalker:id=${dogwalker.id}` });
  };

  return (
    <MainpageWrapper>
      <div className='main'>
        <div className='container'>
          <div className='top-container'>
            <div className='location-container'>
              <div className='description'>원하시는 장소를 선택하세요</div>
              <input placeholder='동 이름을 검색하세요.' />
            </div>
            <div className='date-container'>
              <div className='description'>원하시는 날짜를 선택하세요</div>
              <DateContainer>
                <FontAwesomeIcon icon={faCalendar} color={Colors.darkGray} size='1x' />
                <DatePicker
                  selected={startDate}
                  dateFormat='yyyy.MM.dd'
                  onChange={(date) => setStartDate(date)}
                />
              </DateContainer>
            </div>
            <div className='tag-container'>
              <div className='description'>원하시는 조건을 선택하세요</div>
              {allTagList.map((tag, idx) => {
                return (
                  <Tag
                    borderColor={allTags[tag] ? 'none' : Colors.mediumGray}
                    backgroundColor={allTags[tag] ? Colors.darkGray : 'white'}
                    textColor={allTags[tag] ? 'white' : Colors.darkGray}
                    key={idx}
                    onClick={() => {
                      handleTagClick(tag);
                    }}
                  >
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </div>
          <div className='bottom-container'>
            {dogWalkers.map((dogWalker, idx) => (
              <Dogwalker
                handleClick={() => {
                  handleClick(dogWalker);
                }}
                dogWalker={dogWalker}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </MainpageWrapper>
  );
}

export default Mainpage;
