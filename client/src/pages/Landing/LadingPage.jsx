import { useHistory } from 'react-router-dom';
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
import Intro1 from './Intro1';
import Intro2 from './Intro2';

const LandingWrapper = styled.div`
  .main {
    display: flex;
    flex-wrap: wrap;
    min-height: calc(100vh - 10.65rem);
    padding: 0 2rem;
  }
  .landing-container {
    /* background-color: lavender; */
    width: 100vw;
    min-height: 35rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .landing-container:first-of-type {
    /* background-color: lavender; */
    /* margin-bottom: 8rem; */
  }
  .landing-container:nth-child(2) {
    background-color: #fafafa;
    padding-top: 4.5rem;
    padding-bottom: 7.5rem;
  }
  .title {
    text-align: center;
    margin: 1rem auto 3rem;
    font-size: 2.75rem;
  }
  .price-container {
    display: grid;
    grid-template-areas:
      'des c1 c2';
    grid-template-columns: 43% 27% 30%;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 8rem;
    /* background-color: lime; */
  }
  .intro2 {
    grid-area: des;
    width: 26rem;
    white-space: pre-line;
    padding-left: 3.25rem;
    /* background-color: lavender; */
  }
  .intro2-title {
    font-size: 2.75rem;
    margin-top: 3rem; 
    color: ${Colors.black};
  }
  .intro2-con {
    margin-top: 1.5rem; 
    font-size: 1.2rem;
    line-height: 2rem;
    color: ${Colors.darkGray};
  }
  .price-card {
    width: 16.5rem;
    height: 25rem;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    background-color: white;
    /* background-color: lime; */
    border-radius: 8px;
  }
  .c1 {
    /* background-color: cyan; */
    grid-area: c1;
    margin-top: 1.5rem;
    /* margin-right: 2rem; */
  }
  .c2 {
    grid-area: c2;
  }
  .charge-img {
    height: 9.5rem;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
  .h-line {
    border-bottom: 1px dashed ${Colors.mediumLightGray};
    width: 80%;
    margin: auto auto 2.5rem;
  }
  .time, .price {
    text-align: center;
    font-size: 1.15rem;
  }
  .time {
    padding-top: 2.5rem;
    height: 7rem;
    /* background-color: yellow; */
  }
  .highlight {
    color: ${Colors.yellow};
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: .2rem;
  }
  .review-container {
    display: flex;
    justify-content: space-around;
    /* background-color: pink; */
    width: 15rem;
    flex-wrap: wrap;
    ${media.tablet`width: 92vw;`}
    margin: 0 auto;
  }
  .review-card {
    /* border: 1px solid black; */
    width: 16.5rem;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
  }
  .profile-container {
    width: 15rem;
    height: 10rem;
    overflow: hidden;
    position: relative;
    margin: auto;
    margin-top: .5rem;
  }
  .review-profile {
    width: 15rem;
    /* height: 9.5rem; */
    /* width: 100%; */
  }
  .nickname {
    font-size: 1.2rem;
    margin: .5rem 0 1rem ;
    color: ${Colors.black};
    padding: .5rem 1.5rem 0;
  }
  .content {
    color: ${Colors.darkGray};
    line-height: 1.65rem;
    font-size: .95rem;
    padding: 0 1.5rem 1.5rem;
  }
`;

function LandingPage () {
  const history = useHistory();

  const reviews = useSelector((state) => state.review).dogWalkers[0].review;
  let selectedReview = [...reviews];
  selectedReview = selectedReview.slice(0, 3);

  const charges = [{ duration: '30분 산책', price: '₩12,000', img: charge01 }, { duration: '60분 산책', price: '₩15,000', img: charge02 }];
  const profileImage = [pug, minipin, corgi, default_profile];

  const handleClicked = () => {
    history.push({
      pathname: '/search'
    });
  };

  return (
    <LandingWrapper>
      <div className='main'>
        <div className='landing-container'>
          <Intro1 />
          {/* <Intro2 /> */}
          {/* <div className='intro1'>
            즐거운 산책 시간, {'\n'} 워킹도그에게 맡겨보세요!
          </div>
          <button className='intro-bnt' onClick={handleClicked}>내 주변 도그워커 찾기</button>
          <img className='main-img' alt='main-image' src={mainImg} /> */}
        </div>
        <div className='landing-container'>
          <div className='price-container'>
            <div className='intro2'>
              <div className='intro2-title'>우리 아이 산책 {'\n'} 더 이상 {'\n'}미루지 마세요!</div>
              <div className='intro2-con'>검증된 도그워커가 집 앞까지! {'\n'} 우리 아이의 안전하고{'\n'} 즐거운 산책을 책임집니다</div>

            </div>
            {charges.map((el, idx) => (
              <div key={idx} className={`price-card c${idx + 1}`}>
                <img className='charge-img' alt='profile' src={el.img} />
                <div className='time'>{el.duration}</div>
                <div className='h-line' />
                <div className='price'><span className='highlight'>{el.price}</span>부터</div>
              </div>
            ))}
          </div>
        </div>
        <div className='landing-container'>
          <div className='title'>워킹도그<br />방문 도그워커 후기</div>
          <div className='review-container'>
            {selectedReview.map((review, idx) => (
              <div className='review-card' key={idx}>
                <div className='user-info'>
                  <div className='profile-container'>
                    <img className='review-profile' alt='profile' src={profileImage[idx]} />
                  </div>
                  <div className='nickname'>{review.nickname} 님</div>
                </div>
                <div className='content'>{review.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='landing-container'>
          try it for yourself
          <button>내 주변 도그워커 찾기</button>
        </div>
      </div>
    </LandingWrapper>
  );
}

export default LandingPage;
