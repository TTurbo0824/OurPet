import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Dogwalker from './DogWalkerItem';
import { Colors } from '../../components/utils/_var';
import LocationDropDown from './LocationDropDown';

const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
    min-height: 80rem;
  }
  input:focus {
    outline: none;
  }
  input {
    border: none;
    width: 16.5rem;
    margin: 0 0.3rem 0.35rem;
    color: ${Colors.darkGray};
    /* background-color: lavenderblush; */
  }
  .top-container {
    width: 100vw;
    padding: 0 0.5rem;
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
  .location-search-container {
    display: block;
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
    width: 100vw;
    flex-wrap: wrap;
  }
  .description {
    margin-bottom: 0.5rem;
  }
  .search-icon {
    width: 1.3rem;
    vertical-align: middle;
    margin-top: -0.1rem;
    margin-right: 0.2rem;
  }
`;

const Tag = styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.4rem 0.2rem 0;
  padding: 0.05rem 1rem 0.2rem;
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
`;

const CloseButton = styled.div`
  color: ${Colors.darkGray};
  cursor: pointer;
  padding-left: 0.4rem;
  vertical-align: middle;
  padding-bottom: 0.1rem;
  display: ${(props) => props.show};
`;

function Mainpage() {
  const history = useHistory();
  let dogWalkers = useSelector((state) => state.dogwalker).dogWalkers;
  const rating = useSelector((state) => state.rating).dogWalkers;
  const [startDate, setStartDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [walkerResult, setWalkerResult] = useState(dogWalkers);

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

  useEffect(() => {
    setWalkerResult(dogWalkers);
  }, [allTags]);

  const tags = [];

  for (const key in allTags) {
    if (allTags[key]) {
      tags.push(key);
    }
  }

  const tagChecker = (arr, target) => target.every((el) => arr.includes(el));

  const handleTagClick = (tag) => {
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

  dogWalkers = dogWalkers.filter((dogWalker) => {
    if (tagChecker(dogWalker.tags, tags)) {
      return dogWalker;
    }
  });

  if (location !== '') {
    dogWalkers = dogWalkers.filter((dogWalker) => {
      if (dogWalker.locations.includes(location)) return dogWalker;
    });
  }

  const handleClick = (dogwalker) => {
    history.push({ pathname: `/dogwalker:id=${dogwalker.id}` });
  };

  const getMinValue = (charges) => {
    const allCharge = [];

    Object.values(charges).map((charge) => {
      for (const el of charge) {
        if (typeof el === 'number') {
          allCharge.push(el);
        }
      }
    });

    return Math.min(...allCharge);
  };

  const getAverageRating = (rating) => {
    return (rating.reduce((acc, cur) => acc + cur) / rating.length).toFixed(1);
  };

  function clean(obj) {
    for (var propName in obj) {
      if (Object.keys(obj[propName]).length === 0) {
        delete obj[propName];
      }
    }
  }

  const handleSort = (e) => {
    const sortby = e.target.innerText;

    if (sortby === '평점순') {
      rating.sort((a, b) => {
        if (getAverageRating(b.rating) === getAverageRating(a.rating)) {
          return b.rating.length - a.rating.length;
        }
        return getAverageRating(b.rating) - getAverageRating(a.rating);
      });

      let newDogWalker = Array(20).fill({});

      rating.map((el, idx) => {
        newDogWalker[idx] = dogWalkers[el.id - 1];
      });

      clean(newDogWalker);
      setWalkerResult(newDogWalker);
    }
  };

  // console.log(walkerResult);

  return (
    <MainpageWrapper>
      <div className="main">
        <div className="container">
          <div className="top-container">
            <div className="location-container">
              <div className="description">원하시는 장소를 선택하세요</div>
              <LocationDropDown setLocation={setLocation} />
            </div>
            <div className="date-container">
              <div className="description">원하시는 날짜를 선택하세요</div>
              <DateContainer>
                <FontAwesomeIcon icon={faCalendar} color={Colors.darkGray} size="1x" />
                <DatePicker
                  selected={startDate}
                  dateFormat="yyyy.MM.dd"
                  onChange={(date) => setStartDate(date)}
                />
              </DateContainer>
            </div>
            <div className="tag-container">
              <div className="description">원하시는 조건을 선택하세요</div>
              {allTagList.map((tag, idx) => {
                return (
                  <Tag
                    borderColor={allTags[tag] ? 'none' : Colors.mediumGray}
                    backgroundColor={allTags[tag] ? Colors.darkGray : 'white'}
                    textColor={allTags[tag] ? 'white' : Colors.darkGray}
                    key={idx}
                    onClick={() => {
                      handleTagClick(tag);
                    }}>
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </div>
          <div className="bottom-container">
            <div onClick={handleSort}>가격순</div>
            <div onClick={handleSort}>평점순</div>
            {walkerResult.length === 0 ? (
              <div>검색 결과가 없습니다</div>
            ) : (
              walkerResult.map((dogWalker, idx) => (
                <Dogwalker
                  handleClick={() => {
                    handleClick(dogWalker);
                  }}
                  dogWalker={dogWalker}
                  rating={rating}
                  minPrice={getMinValue(dogWalker.charges)}
                  key={idx}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </MainpageWrapper>
  );
}

export default Mainpage;
