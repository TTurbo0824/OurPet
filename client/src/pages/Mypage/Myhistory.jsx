import styled from 'styled-components';

export const MyHistoryWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 183px);
  }
`;

function MyHistory () {
  return (
    <MyHistoryWrapper>
      <div className='main' />
    </MyHistoryWrapper>
  );
}

export default MyHistory;
