import { Colors } from '../../components/utils/_var';
import mainImg from '../../images/main.jpeg';
import styled from 'styled-components';

const Intro1Wrapper = styled.div`
  .intro1 {
    font-size: 2.7rem;
    text-align: center;
    color: ${Colors.black};
    margin: 1.75rem auto 1.5rem;
    white-space: pre-line;
  }
  .intro-bnt {
    cursor: pointer;
    display: flex;
    margin: 3rem auto auto;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem 1.5rem;
    background-color: ${Colors.lightYellow};
    color: white;
    border: none;
    border-radius: 8px;
    :hover {
      background-color: ${Colors.yellow};
    }
  }
  .main-img {
    display: flex;
    width: 48rem;
    margin: 1rem auto;
    padding: .5rem;
  }
`;
function Intro1 () {
  return (
    <Intro1Wrapper>
      <div className='intro1'>
        즐거운 산책 시간, {'\n'} 워킹도그에게 맡겨보세요!
      </div>
      <button className='intro-bnt'> 내 주변 도그워커 찾기</button>
      <img className='main-img' alt='main-image' src={mainImg} />
    </Intro1Wrapper>
  );
}

export default Intro1;
