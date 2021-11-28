import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './utils/_var';

const TopNaviWrapper = styled.div`
  height: 2rem;
  width: 100vw;
  margin: 0 auto;
  text-align: center;
  margin-bottom: .8rem;
  .button-container {
    display: flex;
    width: 28rem;
    height: 1.98rem;
    margin: 0 auto;
    justify-content: space-between;
    /* background-color: lavender; */
  }
`;

const MyPageButton = styled.button`
  cursor: pointer;
  width: 4.2rem;
  height: 2rem;
  border: none;
  border-bottom: solid 2px ${(props) => props.borderColor};
  background-color: transparent;
  color: ${Colors.darkGray};
  margin: 0 .8rem;
  padding: 0;
  font-size: 1rem;
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
              borderColor={idx === mypageEndpoint.indexOf(history.location.pathname) ? Colors.lightYellow : 'transparent'}
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
