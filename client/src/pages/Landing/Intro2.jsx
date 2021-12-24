import { Colors } from '../../components/utils/_var';
import mainImg2 from '../../images/main03.png';
import styled from 'styled-components';

const Intro2Wrapper = styled.div`
  display: flex; 
  margin-left: 8rem;
  .intro {
    /* background-color: yellow; */
  }
  .intro1 {
    font-size: 2.7rem;
    text-align: left;
    color: ${Colors.black};
    margin: .5rem auto 1.5rem;
    white-space: pre-line;
  }
  .intro-bnt {
    cursor: pointer;
    display: flex;
    /* margin: 3rem auto auto; */
    margin-top: 2.5rem;
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
    width: 26.5rem;
    margin-top: 9rem;
    margin-left: 9rem;
  }
`;
function Intro2 () {
  return (
    <Intro2Wrapper>
      <div className='intro'>
        <div className='intro1'>
            즐거운 산책 시간, {'\n'} 워킹도그에게 {'\n'} 맡겨보세요!
        </div>
        <button className='intro-bnt'> 내 주변 도그워커 찾기</button>
      </div>
        <img className='main-img' alt='main-image' src={mainImg2} />
      
    </Intro2Wrapper>
  );
}

export default Intro2;
