import styled from 'styled-components';

const LandingWrapper = styled.div`
  .main {
    display: flex;
    flex-wrap: wrap;
    min-height: calc(100vh - 10.65rem);
    padding: 0 2rem;
  }
  .landing-container {
    background-color: lavender;
    width: 100vw;
    height: 20rem;
    margin-bottom: 1rem;
  }
`;

function LandingPage () {
  return (
    <LandingWrapper>
      <div className='main'>
        <div className='landing-container'>intro</div>
        <div className='landing-container'>intro2</div>
        <div className='landing-container'>intro3</div>
      </div>
    </LandingWrapper>
  );
}

export default LandingPage;
