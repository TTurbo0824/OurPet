import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import pug from '../../images/pug.jpeg';
import minipin from '../../images/minipin.jpeg';
import corgi from '../../images/corgi.jpeg';
import default_profile from '../../images/default_profile.jpeg';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';
import charge01 from '../../images/charge01.jpeg';
import charge02 from '../../images/charge02.jpeg';
import search from '../../images/search.png';
import request from '../../images/request.png';
import myhistory from '../../images/history.png';
import last from '../../images/last.png';
const LandingWrapper = styled.div`
  .main {
    display: flex;
    flex-wrap: wrap;
    min-height: calc(100vh - 10.65rem);
    justify-content: center;
  }
  .landing-container {
    min-height: 20rem;
    margin-bottom: 1rem;
    padding: 0;
    ${media.tabletMini`padding: 1rem;`}
  }
  .landing-container:first-child {
    min-height: 30rem;
    ${media.laptop`min-height: 36rem;`}
  }
  .landing-container:nth-child(3) {
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    padding-top: 4rem;
    padding-bottom: 7.5rem;
  }
  .title {
    font-size: 1.8rem;
    color: ${Colors.black};
    ${media.tabletMini`font-size: 2.15rem;`}
    ${media.tablet`font-size: 2.75rem;`}
  }
  .intro1-title {
    text-align: center;
    white-space: pre-line;
    margin: 6.5rem auto 1.5rem;
    ${media.tablet`margin-top: 5rem;`}
  }
  .intro2-title {
    margin-top: 3rem; 
  }
  .intro3-title {
    text-align: center;
    margin: 1rem auto 3rem;
  }
  .price-container {
    display: flex;
    max-width: 60rem;
    margin: 7rem auto 5rem;
    flex-wrap: wrap;
    ${media.tablet`margin-top: 6.5rem;`}
    ${media.laptop`flex-wrap: nowrap; justify-content: center; margin: 4rem auto; padding-bottom: 10rem;`}
  }
  .intro2 {
    width: 26rem;
    white-space: pre-line;
    width: 16rem;
    display: flex;
    flex-wrap: wrap;
    ${media.tabletMini`display: block; width: 26rem;`}
    padding-left: 1rem;
    ${media.tabletMini`padding-left: 2.75rem;`}
  }
  .intro2-con {
    margin-top: 1.5rem; 
    font-size: 1.2rem;
    line-height: 2rem;
    color: ${Colors.darkGray};
  }
  .cards-container {
    display: flex;
    margin: 0 auto;
    margin-top: 3.5rem;
    flex-wrap: wrap;
    width: 15rem;
    ${media.tabletMini`flex-wrap: nowrap; width: fit-content;`}
    ${media.tablet`margin-right: 2.75rem;`}
    ${media.laptop`margin-top: 0;`}
  }
  .price-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    width: 13rem;
    height: 21.5rem;
    margin: 0 auto;
    justify-items: center;
    ${media.tablet`width: 15rem; height: 25rem;`}
  }
  .price-card:first-of-type {
    margin: 0 auto;
    margin-bottom: 2rem;
    ${media.tabletMini`margin-top: 1.2rem; margin-right: 1.25rem; margin-bottom: 0;`}
    ${media.tablet`margin-right: 2rem;`}
    ${media.laptop`margin-top: 1.2rem; margin-right: 2.25rem;`}
  }
  .h-line {
    border-bottom: 1px dashed ${Colors.mediumLightGray};
    width: 80%;
    margin: -.5rem auto 1.75rem;
    ${media.tablet`margin: auto auto 2.5rem;`}
  }
  .time, .price {
    text-align: center;
    font-size: 1rem;
    ${media.tablet`font-size: 1.15rem;`}
  }
  .time {
    height: 7rem;
    padding-top: 2.2rem;
    ${media.tablet`padding-top: 2.5rem;`}
  }
  .highlight {
    color: ${Colors.yellow};
    font-size: 1.15rem;
    ${media.tablet`font-size: 1.2rem;`}
    font-weight: bold;
    margin-right: .2rem;
  }
  .review-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 65rem;
    margin: 0 auto;
    ${media.tablet`width: 98vw;`}
    ${media.laptop`width: 92vw;`}
  }
  .review-card {
    width: 16.5rem;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    margin-bottom: 1.75rem;
    ${media.tablet`margin-bottom: 2.25rem;`}
    ${media.laptop`margin-bottom: 0;`}
  }
  .profile-container {
    width: 16rem;
    height: 11.5rem;
    overflow: hidden;
    position: relative;
    margin: auto;
    margin-top: .5rem;
    ${media.tablet`width: 15rem;`}
  }
  .review-profile {
    width: 16rem;
    padding: 0 .5rem;
    ${media.tablet`width: 15rem; padding: 0;`}
  }
  .nickname {
    margin: .5rem 0 1rem ;
    padding: .5rem 1.5rem 0;
    color: ${Colors.black};
    font-size: 1.2rem;
  }
  .content {
    padding: 0 1.5rem 1.5rem;
    color: ${Colors.darkGray};
    line-height: 1.65rem;
    font-size: .95rem;
  }
  .mobile-container {
    display: flex;
    flex-wrap: wrap;
    margin: 6rem auto 6.5rem;
    max-width: 60rem;
    ${media.tablet`flex-wrap: nowrap; justify-content: center;`}
  }
  .mobile-img {
    border-radius: 42px;
    width: 17.5rem;
    height: 33rem;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    margin: 4.5rem auto;
    ${media.tablet`margin: auto 0 0 2.5rem; width: 18.5rem; height: 34rem; border-radius: 43px;`}
    ${media.laptop`margin: 0 3rem 0 9rem;`}
  }
`;

const MobileBnt = styled.button`
  cursor: pointer;
  margin-top: 2rem;
  margin-right: .5rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.borderColor};
  background-color: white;
  font-size: 1rem;
  color: ${Colors.darkGray};
`;

const IntroButton = styled.button`
  cursor: pointer;
  display: flex;
  margin: 3rem auto auto;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  background-color: ${Colors.lightYellow};
  color: white;
  border: none;
  border-radius: 8px;
  :hover {
    background-color: ${Colors.yellow};
  }
`;

const ChargeImg = styled.img`
  height: 8.8rem;
  ${media.tablet`height: 9.5rem;`}
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

const LastContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fafafa;
  margin-bottom: 0;
  padding: 3rem 0 3.5rem;
  .intro5-title {
    width: 100%;
    height: 3rem;
    text-align: center;
    font-size: 1.5rem;
    color: ${Colors.black};
    ${media.tablet`font-size: 1.75rem;`}
    font-size: 1.8rem;
    ${media.tabletMini`font-size: 2.15rem;`}
    ${media.tablet`font-size: 2.75rem;`}
  }
  .last-img {
    margin: 0 auto;
    display: flex;
    width: 16.5rem;
    margin-top: 1rem;
    ${media.tablet`margin-top: 2.75rem;`}
  }
 `;

function LandingPage () {
  const reviews = useSelector((state) => state.review).dogWalkers[0].review;
  let selectedReview = [...reviews];
  selectedReview = selectedReview.slice(0, 3);

  const [endpoint, setEndPoint] = useState(search);
  const charges = [{ duration: '30분 산책', price: '₩12,000', img: charge01 }, { duration: '60분 산책', price: '₩15,000', img: charge02 }];
  const profileImage = [pug, minipin, corgi, default_profile];

  const handleClicked = () => {
    window.location.replace('/search');
  };

  const handleEndpoint = (id) => {
    if (id === '검색하기') setEndPoint(search);
    else if (id === '예약하기') setEndPoint(request);
    else setEndPoint(myhistory);
  };

  const endpointBnts = ['검색하기', '예약하기', '내역관리'];
  const endpoints = ['search', 'request', 'history'];

  return (
    <LandingWrapper>
      <div className='main'>
        <div className='landing-container'>
          <div className='intro1-title title'>
            즐거운 산책 시간, {'\n'} 워킹도그에게 맡겨보세요!
          </div>
          <IntroButton onClick={handleClicked}>내 주변 도그워커 찾기</IntroButton>
        </div>
        <div className='landing-container'>
          <div className='price-container'>
            <div className='intro2'>
              <div className='intro2-title title'>우리 아이 산책 {'\n'} 더 이상 {'\n'}미루지 마세요!</div>
              <div className='intro2-con'>검증된 도그워커가 집 앞까지! {'\n'} 우리 아이의 안전하고{'\n'} 즐거운 산책을 책임집니다</div>
            </div>
            <div className='cards-container'>
              {charges.map((el, idx) => (
                <div key={idx} className={`price-card c${idx + 1}`}>
                  <ChargeImg alt='profile' src={el.img} />
                  <div className='time'>{el.duration}</div>
                  <div className='h-line' />
                  <div className='price'><span className='highlight'>{el.price}</span>부터</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='landing-container'>
          <div className='intro3-title title'>워킹도그<br />방문 도그워커 후기</div>
          <div className='review-container'>
            {selectedReview.map((review, idx) => (
              <div className='review-card' key={idx}>
                <div className='profile-container'>
                  <img className='review-profile' alt='profile' src={profileImage[idx]} />
                </div>
                <div className='nickname'>{review.nickname} 님</div>
                <div className='content'>{review.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='landing-container'>
          <div className='mobile-container'>
            <div className='intro2'>
              <div className='intro2-title title'>모바일에서도 {'\n'} 간편하게 {'\n'}이용해보세요!</div>
              {endpointBnts.map((el, idx) =>
                <MobileBnt
                  borderColor={endpoint.includes(endpoints[idx]) ? Colors.darkGray : 'transparent'}
                  key={idx}
                  onClick={() => handleEndpoint(el)}
                >
                  {el}
                </MobileBnt>
              )}
            </div>
            <img className='mobile-img' alt='mobile-img' src={endpoint} />
          </div>
        </div>
        <LastContainer>
          <div className='intro5-title'>우리 아이 산책,</div>
          <img className='last-img' alt='mobile-img' src={last} />
          <IntroButton onClick={handleClicked}>워킹도그와 함께하기!</IntroButton>

        </LastContainer>
      </div>
    </LandingWrapper>
  );
}

export default LandingPage;
