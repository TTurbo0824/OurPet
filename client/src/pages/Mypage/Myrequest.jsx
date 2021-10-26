import styled from 'styled-components';

export const MyRequestWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 183px);
  }
`;

function MyRequest () {
  return (
    <MyRequestWrapper>
      <div className='main' />
    </MyRequestWrapper>
  );
}

export default MyRequest;
