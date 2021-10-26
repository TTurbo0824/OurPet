import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

export const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 183px);
  }
`;

function Mainpage () {
  const dogWalker = useSelector((state) => state.dogwalker);
  console.log(dogWalker);

  return (
    <MainpageWrapper>
      <div className='main' />
    </MainpageWrapper>
  );
}

export default Mainpage;
