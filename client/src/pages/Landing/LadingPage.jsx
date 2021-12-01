import styled from 'styled-components';
import { useSelector } from 'react-redux';
import pug from '../../images/pug.jpeg';
import minipin from '../../images/minipin.jpeg';
import corgi from '../../images/corgi.jpeg';
import default_profile from '../../images/default_profile.jpeg';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';

const LandingWrapper = styled.div`
  .main {
    display: flex;
    flex-wrap: wrap;
    min-height: calc(100vh - 10.65rem);
    padding: 0 2rem;
  }
  .landing-container {
    background-color: lavender;
    width: 100vw;
    min-height: 35rem;
    margin-bottom: 1rem;
  }
  .review-container {
    display: flex;
    justify-content: space-around;
    background-color: pink;
    width: 15rem;
    flex-wrap: wrap;
    ${media.tablet`width: 92vw;`}
    margin: 0 auto;
  }
  .review-card {
    /* border: 1px solid black; */
    width: 15rem;
    padding: 1rem;
    background-color: white;
    border-radius: 3px;
  }
  .profile-container {
    width: 12rem;
    height: 8rem;
    overflow: hidden;
    position: relative;
    margin: auto;
  }
  .review-profile {
    width: 12rem;
  }
`;

function LandingPage () {
  const reviews = useSelector((state) => state.review).dogWalkers[0].review;
  let selectedReview = [...reviews];
  selectedReview = selectedReview.slice(0, 3);
  // console.log(selectedReview);

  const profileImage = [pug, minipin, corgi, default_profile];

  return (
    <LandingWrapper>
      <div className='main'>
        <div className='landing-container'>
          grand introduction
          <button>내 주변 도그워커 찾기</button>
        </div>
        <div className='landing-container'>service introduction (price/duration)</div>
        <div className='landing-container'>
          방문 도그워커 후기
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
