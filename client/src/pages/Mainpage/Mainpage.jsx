import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Dogwalker from './Dogwalker';

export const MainpageWrapper = styled.div`
  .main {
    display: flex;
    /* height: 800rem; */
    min-height: calc(100vh - 10.9rem);
  }
`;

function Mainpage () {
  let dogWalkers = useSelector((state) => state.dogwalker).dogWalkers;
  console.log(dogWalkers);
  const allTags = [
    '소형견',
    '중형견',
    '대형견',
    '야외 배변',
    '산책 후 뒤처리',
    '산책 예절 교육'
  ];

  const tags = ['대형견', '야외 배변'];

  // dogWalkers = dogWalkers.filter((dogWalker) => dogWalker.locations.includes('종로구'));
  const tagChecker = (arr, target) => target.every(el => arr.includes(el));

  dogWalkers = dogWalkers.filter((dogWalker) => {
    if (tagChecker(dogWalker.tags, tags)) return dogWalker;
  });

  return (
    <MainpageWrapper>
      <div className='main'>
        {dogWalkers.map((dogWalker, idx) => (
          <Dogwalker dogWalker={dogWalker} key={idx} />
        ))}
      </div>
    </MainpageWrapper>
  );
}

export default Mainpage;
