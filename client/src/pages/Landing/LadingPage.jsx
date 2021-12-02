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
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .title {
    text-align: center;
    margin: 1rem auto 2.5rem;
    font-size: 2.75rem;
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
  .price-container {
    display: flex;

  }
  .price-card {
    /* border: 1px solid black; */
    width: 16.5rem;
    height: 25rem;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
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
  const reviews = useSelector((state) => state.review).dogWalkers[0].review;
  let selectedReview = [...reviews];
  selectedReview = selectedReview.slice(0, 3);
  // console.log(selectedReview);
  const charges = [{ duration: '30분 산책', price: '₩12,000', img: charge01 }, { duration: '60분 산책', price: '₩15,000', img: charge02 }];
  const profileImage = [pug, minipin, corgi, default_profile];

  return (
    <LandingWrapper>
      <div className='main'>
        <div className='landing-container'>
          grand introduction
          <button>내 주변 도그워커 찾기</button>
        </div>
        <div className='landing-container'>
          우리 아이 산책, 워킹도그에게 맡겨보세요
          <div className='price-container'>
            {charges.map((el, idx) => (
              <div key={idx}>
                <div className='price-card'>
                  <img className='review-profile' alt='profile' src={el.img} />
                  {el.duration} {el.price}부터
                </div>
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
