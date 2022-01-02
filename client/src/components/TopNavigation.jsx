import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';

const TopNaviWrapper = styled.div`
  height: 2rem;
  width: 100vw;
  margin: 0 auto;
  text-align: center;
  margin-bottom: .8rem;
  .button-container {
    display: flex;
    width: 17rem;
    ${media.tabletMini`width: 24rem;`}
    ${media.tablet`width: 28rem;`}
    max-width: 28rem;
    height: 1.98rem;
    margin: 0 auto;
    justify-content: space-between;
  }
  .expandable {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
`;

const MyPageButton = styled.button`
  cursor: pointer;
  width: 3.8rem;
  height: 2rem;
  border: none;
  border-bottom: solid 3px ${(props) => props.borderColor};
  background-color: transparent;
  color: ${(props) => props.textColor};
  margin: 0 .8rem;
  padding: 0;
  font-size: .9rem;
  ${media.tabletMini`width: 4rem; font-size: 1rem;`}
  ${media.tablet`width: 4.2rem;`}
`;

function TopNavigation () {
  const history = useHistory();
  const mypageButton = ['내 정보', '요청 내역', '이용 내역'];
  const mypageEndpoint = ['/mypage', '/myrequest', '/myhistory'];

  const handleClicked = (idx) => {
    history.push({
      pathname: mypageEndpoint[idx]
    });
  };

  return (
    <TopNaviWrapper>
      <div className='button-container'>
        {mypageButton.map((el, idx) => {
          return (
            <MyPageButton
              key={idx}
              borderColor={idx === mypageEndpoint.indexOf(history.location.pathname) ? Colors.darkGray : 'transparent'}
              textColor={idx === mypageEndpoint.indexOf(history.location.pathname) ? Colors.black : Colors.darkGray}
              onClick={() => handleClicked(idx)}
            >
              {el}
            </MyPageButton>
          );
        })}
      </div>
    </TopNaviWrapper>
  );
}

export default TopNavigation;
