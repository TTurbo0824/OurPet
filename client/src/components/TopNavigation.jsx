import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './utils/_var';

const TopNaviWrapper = styled.div`
  background-color: lavender;
  height: 2rem;
  width: 100vw;
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
        return <button onClick={() => handleClicked(idx)}>{el}</button>;
      })}
    </TopNaviWrapper>
  );
}

export default TopNavigation;
