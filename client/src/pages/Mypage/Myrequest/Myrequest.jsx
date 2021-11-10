import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import TopNavigation from '../../../components/TopNavigation';

export const MyRequestWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 8.9rem);
  }
`;

function MyRequest () {
  const dispatch = useDispatch();
  const dogWalkerList = useSelector((state) => state.dogwalker).dogWalkers;
  let requestList = useSelector((state) => state.request).dogWalkerRequest;

  const walkerList = [];

  dogWalkerList.map((el) => {
    walkerList.push(el.name);
  });

  requestList = requestList.map((el) => {
    return { ...el, name: walkerList[el.dogwalkerId - 1] };
  });

  console.log(requestList);

  return (
    <MyRequestWrapper>
      <TopNavigation />
      <div className='main'>
        My Request
      </div>
    </MyRequestWrapper>
  );
}

export default MyRequest;
