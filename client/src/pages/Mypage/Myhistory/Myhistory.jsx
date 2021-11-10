import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import TopNavigation from '../../../components/TopNavigation';
export const MyHistoryWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
  }
`;

function MyHistory () {
  const dispatch = useDispatch();
  const historyList = useSelector((state) => state.history).dogWalkerHistory;
  console.log(historyList);

  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        My History
      </div>
    </MyHistoryWrapper>
  );
}

export default MyHistory;
