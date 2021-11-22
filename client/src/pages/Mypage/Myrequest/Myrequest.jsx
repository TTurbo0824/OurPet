import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import TopNavigation from '../../../components/TopNavigation';
import { Colors } from '../../../components/utils/_var';

export const MyRequestWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 10.9rem);
    justify-content: center;
  }
  .container {
    margin: 1rem auto;
  }
  .card {
    display: grid;
    grid-template-areas:
      'img title status cancel'
      'img info status cancel'
      'img type status cancel';
    grid-template-columns: 23% 47% 15% 15%;
    margin: 0 auto;
    /* text-align: center; */
    border-top: 1px solid ${Colors.lightGray};
    padding: .4rem 1rem;
    width: 40rem;
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 7.5rem;
    height: 7.5rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .name {
    grid-area: title;
  }
  .info {
    grid-area: info;
  }
  .type {
    grid-area: type;
  }
  .status {
    grid-area: status;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    height: 5rem;
    border: 1px solid ${Colors.mediumGray};
    border-radius: 4px;
  }
  .cancel {
    cursor: pointer;
    grid-area: cancel;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    /* background-color: navajowhite; */
  }
`;

function MyRequest ({ handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const deleteClick = (id) => {
    console.log(id);
    handleNotice(true);
    handleMessage(`정말 요청을 취소하시겠습니까?!${id}`);
  };

  const handleClick = (id) => {
    history.push({ pathname: `/dogwalker:id=${id}` });
  };

  return (
    <MyRequestWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          {requestList.map((el, idx) => {
            return (
              <div className='card' key={idx}>
                <img className='dogwalker-img' src={el.img} alt={el.name} onClick={() => handleClick(el.dogwalkerId)} />
                <div className='name'>{el.name}</div>
                <div className='info'>{el.date} <span>|</span> {el.duration}분 / {el.price}원</div>
                <div className='type'>{el.type}</div>
                <div className='status'>{el.status}</div>
                <div className='cancel' onClick={() => deleteClick(el.id)}>요청 취소</div>
              </div>
            );
          })}
        </div>
      </div>
    </MyRequestWrapper>
  );
}

export default MyRequest;
