import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './utils/_var';

const TopNaviWrapper = styled.div`
  /* background-color: lavender; */
  height: 2rem;
  width: 100vw;
  margin: 0 auto;
  text-align: center;
`;

const MyPageButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  /* background-color: lavenderblush; */
  margin: 0 .8rem;
  padding: 0;
  border-bottom: solid 1px ${(props) => props.borderColor};
  font-size: 1rem;
`;

function TopNavigation () {
  const history = useHistory();
  const mypageButton = ['My Info', 'My Request', 'My History'];
  const mypageEndpoint = ['/mypage', '/myrequest', '/myhistory'];

  const handleClicked = (idx) => {
    history.push({
      pathname: mypageEndpoint[idx]
    });
  };

  return (
    <TopNaviWrapper>
      {mypageButton.map((el, idx) => {
        return (
          <MyPageButton
            key={idx}
            borderColor={idx === mypageEndpoint.indexOf(history.location.pathname) ? 'black' : 'white'}
            onClick={() => handleClicked(idx)}
          >
            {el}
          </MyPageButton>
        );
      })}
    </TopNaviWrapper>
  );
}

export default TopNavigation;
