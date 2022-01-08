import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';
import Dogwalker from './DogWalkerItem';
import LocationDropDown from './LocationDropDown';
import DateSelector from './DateSelector';
import loading from '../../images/loading.gif';
import { PageLoading } from '../../components/PageLoading';

const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
    padding: 0 1.25rem; 
    ${media.tablet`padding: 1rem 0;`}
  }
  .container {
    margin: 0 auto;
    display: block;
    padding: 0 auto;
    max-width: 62rem;
    ${media.tablet`width: 90vw;`}
  }
  input:focus {
    outline: none;
  }
  input {
    border: none;
    width: 100%;
    color: ${Colors.gray};
  }
  .top-container {
    width: 100%;
    display: grid;
    grid-template-areas: 'location' 'date' 'tag';
    grid-template-columns: 100%;
    ${media.tablet`grid-template-areas: 'location date' 'tag tag';`}
    ${media.tablet`grid-template-columns: 50% 50%;`}
  }
  .location-container {
    grid-area: location;
  }
  .date-container {
    grid-area: date;
    ${media.tablet`justify-self: right;`}
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .top-tag-container {
    grid-area: tag;
    padding-bottom: .75rem;
    border-bottom: 1px solid ${Colors.lightGray};
  }
  .bottom-container {
    display: flex;
    margin-top: 1.75rem;
    width: 100%;
    flex-wrap: wrap;
  }
  .dogwalker-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .description {
    margin-bottom: .75rem;
    font-size: .9rem;
    ${media.tablet`font-size: .95rem;`}
  }
  .sorting-container {
    display: flex;
    width: 100%;
    padding: .5rem 0 1.25rem;
    ${media.tablet`padding: 1rem 0 1.5rem;`}
    justify-content: right;
  }
  .sorting {
    cursor: pointer;
    margin-left: .5rem;
    font-size: .9rem;
    color: ${Colors.mediumGray};
  }
  .no-result {
    display: flex;
    margin-right: .3rem;
    color: ${Colors.darkGray};
    font-size: .95rem;
    ${media.tablet`font-size: 1rem;`}
  }
`;

const Description = styled.div`
  margin-bottom: .75rem;
  margin-top: ${(props) => props.topMargin};
  font-size: .9rem;
  ${media.tablet`font-size: .95rem; margin-top: 0;`}
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
  margin: .2rem .5rem .5rem 0;
  padding: .05rem 1rem .2rem;
  border: solid 1px;
  border-color: ${(props) => props.borderColor};
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  font-size: .9rem;
  ${media.tablet`font-size: 1rem; margin: .2rem .6rem .2rem 0;`}
`;

const LoadingWrapper = styled.div`
  margin: 0 auto;
  .loading {
    width: 6rem;
    ${media.tablet`width: 7rem;`}
    margin-bottom: 1rem;
  }
`;

const Reset = styled.div`
  cursor: pointer;
  margin-top: .75rem;
  justify-content: right;
  display: flex;
  font-size: .9rem;
  color: ${Colors.gray};
  ${media.laptop`margin-top: .5rem;`}
`;

function Mainpage ({ handleMessage, handleNotice }) {
  let dogWalkers = useSelector((state) => state.dogwalker).dogWalkers;
  const [location, setLocation] = useState('');
  const [walkerResult, setWalkerResult] = useState(dogWalkers);
  const initTagState = {
    소형견: false,
    중형견: false,
    대형견: false,
    '야외 배변': false,
    '산책 후 뒤처리': false,
    '산책 예절 교육': false
  };
  const [allTags, setAllTags] = useState(initTagState);

  const [sortbyRating, setSortbyRating] = useState('none');
  const [sortbyPrice, setSortbyPrice] = useState('none');
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const loadingTime = (Math.random() + 1) * 800;
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
    setWalkerResult(dogWalkers);
    setSortbyRating('none');
    setSortbyPrice('none');
    return () => {
      setWalkerResult({});
      setSortbyRating({});
      setSortbyPrice({});
    };
  }, [allTags, location, dogWalkers]);

  useEffect(() => {
    const fetchData = async () => {
      setIsPageLoading(true);
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/mainpage`);
        setIsPageLoading(false);
        setRatingData(result.data.data.allRating);
      } catch (error) {
        if (error) {
          setIsPageLoading(false);
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
        }
      }
    };
    fetchData();
  }, [dogWalkers]);

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
    } else return null;
  });

  if (location !== '') {
    dogWalkers = dogWalkers.filter((dogWalker) => {
      if (dogWalker.locations.includes(location)) return dogWalker;
      else return null;
    });
  }

  const getMinValue = (charges) => {
    const allCharge = [];

    Object.values(charges).forEach((charge) => {
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
    Object.values(walker.charges).forEach((charge) => {
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
        ratingData.sort((a, b) => {
          if (getAverageRating(b.rating) === getAverageRating(a.rating)) {
            return b.rating.length - a.rating.length;
          }
          return getAverageRating(b.rating) - getAverageRating(a.rating);
        });
        setSortbyRating('des');
      } else {
        ratingData.sort((a, b) => {
          if (getAverageRating(b.rating) === getAverageRating(a.rating)) {
            return b.rating.length - a.rating.length;
          }
          return getAverageRating(a.rating) - getAverageRating(b.rating);
        });
        setSortbyRating('asc');
      }

      const ratingList = [];

      ratingData.forEach((el) => {
        ratingList.push(el.id);
      });

      dogWalkers.forEach((el) => {
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

      chargeList.forEach((el) => {
        minChargeList.push(el.id);
      });

      dogWalkers.forEach((el) => {
        newDogWalker[minChargeList.indexOf(el.id)] = el;
      });
    }
    newDogWalker = newDogWalker.filter((el) => Object.keys(el).length !== 0);
    setWalkerResult(newDogWalker);
  };

  const handleClick = (dogwalker) => {
    window.location.replace(`/dogwalker:id=${dogwalker.id}`);
  };

  const resetSearch = () => {
    window.location.replace('/search');
  };

  return (
    <MainpageWrapper>
      <div className='main'>
        <div className='container'>
          <div className='top-container'>
            <div className='location-container'>
              <Description topMargin='0'>원하시는 장소를 선택하세요</Description>
              <LocationDropDown setLocation={setLocation} />
            </div>
            <div className='date-container'>
              <Description topMargin='.5rem'>원하시는 날짜를 선택하세요</Description>
              <DateSelector />
            </div>
            <div className='top-tag-container'>
              <Description topMargin='.5rem'>원하시는 조건을 선택하세요</Description>
              {allTagList.map((tag, idx) => {
                return (
                  <Tag
                    borderColor={allTags[tag] ? Colors.yellow : Colors.mediumGray}
                    backgroundColor={allTags[tag] ? Colors.yellow : 'white'}
                    textColor={allTags[tag] ? 'white' : Colors.gray}
                    key={idx}
                    onClick={() => {
                      handleTagClick(tag);
                    }}
                  >
                    {tag}
                  </Tag>
                );
              })}
              <Reset onClick={resetSearch}>검색 초기화</Reset>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='sorting-container'>
              <Sorting onClick={handleSort} textColor={sortbyPrice === 'none' ? Colors.mediumGray : 'black'}>가격순</Sorting>
              <Sorting onClick={handleSort} textColor={sortbyRating === 'none' ? Colors.mediumGray : 'black'}>평점순</Sorting>
            </div>
            {isPageLoading
              ? <PageLoading />
              : <div className='dogwalker-container'>
                {walkerResult.length === 0
                  ? <div className='no-result'>검색 조건에 해당하는 도그워커가 없습니다.</div>
                  : (
                      ratingData.length !== 0 && walkerResult.map((dogWalker, idx) => {
                        if ((idx + 1) <= (isScrollCnt * dogwalkerCount)) {
                          return (
                            <Dogwalker
                              handleClick={() => {
                                handleClick(dogWalker);
                              }}
                              dogWalker={dogWalker}
                              rating={ratingData}
                              minPrice={getMinValue(dogWalker.charges)}
                              key={idx}
                              tags={dogWalker.tags}
                            />
                          );
                        } else return null;
                      }))}
              </div>}
            {isLoading &&
              <LoadingWrapper>
                <img className='loading' src={loading} alt='loading' />
              </LoadingWrapper>}
          </div>
        </div>
      </div>
    </MainpageWrapper>
  );
}

export default Mainpage;
