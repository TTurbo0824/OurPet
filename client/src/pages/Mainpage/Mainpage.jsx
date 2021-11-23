import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media';
import Dogwalker from './DogWalkerItem';
import LocationDropDown from './LocationDropDown';
import DateSelector from './DateSelector';
const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
    padding-top: 1rem;
  }
  .container {
    margin: 0 auto;
    display: block;
    padding: 0 auto;
    ${media.tablet`width: 90vw;`}
    max-width: 62rem;
    /* background-color: lime; */
  }
  input:focus {
    outline: none;
  }
  input {
    border: none;
    /* width: 16.5rem; */
    width: 100%;
    color: ${Colors.gray};
  }
  .top-container {
    /* width: 100vw; */
    width: 100%;
    /* padding: 0 0.5rem; */
    display: grid;
    grid-template-areas: 'location' 'date' 'tag';
    grid-template-columns: 100%;
    ${media.tablet`grid-template-areas: 'location date' 'tag tag';`}
    ${media.tablet`grid-template-columns: 50% 50%;`}
    /* background-color: pink; */
  }
  .location-container {
    grid-area: location;
    /* padding: 0 1rem; */
    /* background-color: pink; */
  }
  .date-container {
    grid-area: date;
    ${media.tablet`justify-self: right;`}
    margin-right: 0;
    /* padding: 0 1rem; */
    margin-bottom: 1rem;
  }
  .top-tag-container {
    grid-area: tag;
    padding-bottom: .75rem;
    border-bottom: 1px solid ${Colors.lightGray};
  }
  .bottom-container {
    display: flex;
    margin-top: 2rem;
    /* width: 100vw; */
    width: 100%;
    flex-wrap: wrap;
  }
  .dogwalker-container {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    justify-content: space-between;
  }
  .description {
    margin-bottom: 0.5rem;
  }
  .sorting-container {
    display: flex;
    width: 100%;
    padding: 1rem 0 1.5rem;
    justify-content: right;
  }
  .sorting {
    cursor: pointer;
    margin-left: .5rem;
    font-size: .9rem;
    color: ${Colors.mediumGray};
  }
  .reset {
    cursor: pointer;
    margin-top: .5rem;
    justify-content: right;
    display: flex;
    font-size: .9rem;
    color: ${Colors.gray};
  }
`;

const Sorting = styled.div`
  cursor: pointer;
  margin-left: .5rem;
  font-size: .9rem;
  color: ${(props) => props.textColor};
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

const LoadingWrapper = styled.div`
  margin: 0 auto;
  .loading {
    width: 3rem;
    margin-top: -.5rem;
    margin-bottom: 1.2rem;
  }
`;

function Mainpage () {
  const history = useHistory();
  let dogWalkers = useSelector((state) => state.dogwalker).dogWalkers;
  const rating = useSelector((state) => state.rating).dogWalkers;
  const [location, setLocation] = useState('');
  const [walkerResult, setWalkerResult] = useState(dogWalkers);
  const [allTags, setAllTags] = useState({
    소형견: false,
    중형견: false,
    대형견: false,
    '야외 배변': false,
    '산책 후 뒤처리': false,
    '산책 예절 교육': false
  });

  const [sortbyRating, setSortbyRating] = useState('none');
  const [sortbyPrice, setSortbyPrice] = useState('none');
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadingTime = (Math.random() + 1) * 1000;

  const dogwalkerCount = 5;
  window.onscroll = () => {
    const scrollLocation = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    if ((fullHeight <= scrollLocation + windowHeight) && (Math.ceil(walkerResult.length / dogwalkerCount) > isScrollCnt)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsScrollCnt(isScrollCnt + 1);
      }, loadingTime);
    }
  };

  useEffect(() => {
    if (allTags) {
      setWalkerResult(dogWalkers);
      setSortbyRating('none');
      setSortbyPrice('none');
    }
  }, [allTags]);

  useEffect(() => {
    setWalkerResult(dogWalkers);
    setSortbyRating('none');
    setSortbyPrice('none');
  }, [location]);

  const allTagList = [
    '소형견',
    '중형견',
    '대형견',
    '야외 배변',
    '산책 후 뒤처리',
    '산책 예절 교육'
  ];

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

  const chargeList = dogWalkers.map((walker) => {
    const allChargeList = [];
    Object.values(walker.charges).map((charge) => {
      for (const el of charge) {
        if (typeof el === 'number') {
          allChargeList.push(el);
        }
      }
    });
    return { id: walker.id, minPrice: Math.min(...allChargeList) };
  });

  const handleSort = (e) => {
    const sortby = e.target.innerText;
    let newDogWalker = Array(20).fill({});

    if (sortby === '평점순') {
      setSortbyPrice('none');
      if (sortbyRating !== 'des') {
        rating.sort((a, b) => {
          if (getAverageRating(b.rating) === getAverageRating(a.rating)) {
            return b.rating.length - a.rating.length;
          }
          return getAverageRating(b.rating) - getAverageRating(a.rating);
        });
        setSortbyRating('des');
      } else {
        rating.sort((a, b) => {
          if (getAverageRating(b.rating) === getAverageRating(a.rating)) {
            return b.rating.length - a.rating.length;
          }
          return getAverageRating(a.rating) - getAverageRating(b.rating);
        });
        setSortbyRating('asc');
      }

      const ratingList = [];

      rating.map((el) => {
        ratingList.push(el.id);
      });

      dogWalkers.map((el) => {
        newDogWalker[ratingList.indexOf(el.id)] = el;
      });
    } else if (sortby === '가격순') {
      setSortbyRating('none');
      if (sortbyPrice !== 'des') {
        chargeList.sort((a, b) => {
          return b.minPrice - a.minPrice;
        });
        setSortbyPrice('des');
      } else {
        chargeList.sort((a, b) => {
          return a.minPrice - b.minPrice;
        });
        setSortbyPrice('asc');
      }

      const minChargeList = [];

      chargeList.map((el) => {
        minChargeList.push(el.id);
      });

      dogWalkers.map((el) => {
        newDogWalker[minChargeList.indexOf(el.id)] = el;
      });
    }
    newDogWalker = newDogWalker.filter((el) => Object.keys(el).length !== 0);
    setWalkerResult(newDogWalker);
  };

  const handleClick = (dogwalker) => {
    history.push({ pathname: `/dogwalker:id=${dogwalker.id}` });
  };

  const resetSearch = () => {
    window.location.replace('/');
  };

  return (
    <MainpageWrapper>
      <div className='main'>
        <div className='container'>
          <div className='top-container'>
            <div className='location-container'>
              <div className='description'>원하시는 장소를 선택하세요</div>
              <LocationDropDown setLocation={setLocation} />
            </div>
            <div className='date-container'>
              <div className='description'>원하시는 날짜를 선택하세요</div>
              <DateSelector />
            </div>
            <div className='top-tag-container'>
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
              <div className='reset' onClick={resetSearch}>검색 초기화</div>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='sorting-container'>
              <Sorting onClick={handleSort} textColor={sortbyPrice === 'none' ? Colors.mediumGray : 'black'}>가격순</Sorting>
              <Sorting onClick={handleSort} textColor={sortbyRating === 'none' ? Colors.mediumGray : 'black'}>평점순</Sorting>
            </div>
            <div className='dogwalker-container'>
              {walkerResult.length === 0
                ? (
                  <div>검색 결과가 없습니다</div>
                  )
                : (
                    walkerResult.map((dogWalker, idx) => {
                      if ((idx + 1) <= (isScrollCnt * dogwalkerCount)) {
                        return (
                          <Dogwalker
                            handleClick={() => {
                              handleClick(dogWalker);
                            }}
                            dogWalker={dogWalker}
                            rating={rating}
                            minPrice={getMinValue(dogWalker.charges)}
                            key={idx}
                            tags={dogWalker.tags}
                          />
                        );
                      }
                    }))}
            </div>
            {isLoading &&
              <LoadingWrapper>
                <img className='loading' src='images/loading.gif' alt='loading' />
              </LoadingWrapper>}
          </div>
        </div>
      </div>
    </MainpageWrapper>
  );
}

export default Mainpage;
