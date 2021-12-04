import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TopNavigation from '../../../components/TopNavigation';
import { Colors } from '../../../components/utils/_var';
axios.defaults.withCredentials = true;
require('dotenv').config();

export const MyRequestWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 13.45rem);
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
    grid-template-columns: 7.25rem 50% 15% 15%;
    margin: 0 auto;
    /* text-align: center; */
    border-top: 1px solid ${Colors.lightGray};
    padding: .4rem 1rem;
    width: 40rem;
  }
  .card:first-of-type {
    border-top: none;
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 6rem;
    height: 6rem;
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
  .name, .info, .type {
    font-size: .9rem;
  }
  .status {
    grid-area: status;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    font-size: .85rem;
  }
  .cancel {
    grid-area: cancel;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    /* background-color: navajowhite; */
  }
  .bnt {
    cursor: pointer;
    align-self: center;
    justify-self: center;
    padding: .4rem .7rem;
    font-size: .85rem;
    border: 1px solid ${Colors.mediumLightGray};
  }
`;

function MyRequest ({ handleMessage, handleNotice }) {
  const history = useHistory();
  const token = useSelector((state) => state.user).token;
  const dogWalkerList = useSelector((state) => state.dogwalker).dogWalkers;
  let allRequest = useSelector((state) => state.request).dogWalkerRequest;
  const [isLoading, setIsLoading] = useState(false);
  const [allRequests, setAllRequests] = useState(allRequest);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/request`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setAllRequests(result.data.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response.data.message === 'No requests are found') {
          setIsLoading(false);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  const walkerList = [];

  dogWalkerList.map((el) => (
    walkerList.push(el.name)
  ));

  if (allRequest) {
    allRequest = allRequest.map((el) => {
      return { ...el, name: walkerList[el.dogwalkerId - 1] };
    });
  }

  const deleteClick = (id) => {
    console.log(id);
    handleNotice(true);
    handleMessage(`정말 요청을 취소하시겠습니까?!${id}`);
  };

  const handleClick = (id) => {
    history.push({ pathname: `/dogwalker:id=${id}` });
  };

  const addComma = (num) => {
    num = String(num).split('');
    num.splice(-3, 0, ',');
    num = num.join('');
    return num;
  };

  return (
    <MyRequestWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          {allRequests.length === 0
            ? <div>결과 없음</div>
            : allRequests.map((el, idx) => {
              return (
                <div className='card' key={idx}>
                  <img className='dogwalker-img' src={el.img} alt={el.name} onClick={() => handleClick(el.dogwalkerId)} />
                  <div className='name'>{el.name}</div>
                  <div className='info'>{el.date} <span>|</span> {el.duration}분 / {addComma(el.price)}원</div>
                  <div className='type'>{el.type}</div>
                  <div className='status'>요청 처리 중</div>
                  <div className='cancel bnt' onClick={() => deleteClick(el.id)}>요청 취소</div>
                </div>
              );
            })}
        </div>
      </div>
    </MyRequestWrapper>
  );
}

export default MyRequest;
