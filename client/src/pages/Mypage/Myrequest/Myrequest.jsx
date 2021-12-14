import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TopNavigation from '../../../components/TopNavigation';
import { Colors } from '../../../components/utils/_var';
axios.defaults.withCredentials = true;
require('dotenv').config();
const moment = require('moment');

export const MyRequestWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 13.45rem);
  }
  .no-items {
    text-align: center;
    margin: 2.5rem auto 2rem;
    white-space: pre-line;
  }
  .search-bnt {
    display: flex;
    margin: auto;
    padding: .75rem 1.25rem;
    cursor: pointer;
    background-color: ${Colors.lightYellow};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: .9rem;
    &:hover {
      background-color: ${Colors.yellow};
    }
  }
  .container {
    margin: 1rem auto;
    /* background-color: lime; */
  }
  .field-container {
    display: grid;
    padding-bottom: .1rem;
    border-bottom: 1px solid ${Colors.lightGray};
    grid-template-areas:
      'alls expired select';
    grid-template-columns: 1fr 1fr 5.6rem;
    width: 40rem;
  }
  .select-all {
    align-self: center;
  }
  .select-all, .select-one {
    cursor: pointer;
  }
  .all {
    display: flex;
    grid-area: alls;
  }
  .description {
    margin-left: .3rem;
    font-size: .83rem;
    color: ${Colors.darkGray};
    align-self: center;
    padding-bottom: .15rem;
  }
  .delete-bnt {
    cursor: pointer;
    display: flex;
    margin-right: 0;
    margin-left: auto;
  }
  .separator {
    margin-left: .64rem;
    font-size: .65rem;
    line-height: 1.15rem;
    color: ${Colors.mediumLightGray};
  }
  .expired {
    grid-area: expired;
  }
  .select {
    grid-area: select;
    margin-right: .4rem;
  }
  .card {
    display: grid;
    grid-template-areas:
      'check img title status cancel'
      'check img info status cancel'
      'check img type status cancel';
    grid-template-columns: 1.5rem 7.25rem 48% 15% 15%;
    margin: .3rem auto;
    padding-bottom: .4rem;
    border-bottom: 1px solid ${Colors.lightGray};
    width: 40rem;
    /* background-color: lime; */
  }
  .card:first-of-type {
    border-top: none;
  }
  .select-one {
    grid-area: check;
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

function MyRequest ({ modal, handleMessage, handleNotice }) {
  const history = useHistory();
  const token = useSelector((state) => state.user).token;
  const dogWalkerList = useSelector((state) => state.dogwalker).dogWalkers;
  const allRequest = useSelector((state) => state.request).dogWalkerRequest;
  const [IdList, setIdList] = useState([]);
  const [CheckList, setCheckList] = useState([]);

  const isExpired = (date, time) => {
    const now = new Date();
    const target = moment(now);
    let requestTime = 0;

    if (time === '오전 12시') {
      requestTime = 0;
    } else if (time === '오후 12시') {
      requestTime = 12;
    } else if (time[1] === '후') {
      requestTime = Number(time.split(' ')[1].slice(0, -1)) + 12;
    } else {
      requestTime = Number(time.split(' ')[1].slice(0, -1));
    }

    const dateTime = `${date} ${requestTime}`;
    const requestDate = moment(dateTime, 'YYYY.MM.DD H');

    return requestDate.from(target).includes('ago') ? '요청 만료' : '요청 처리 중';
  };

  useEffect(() => {
    const ids = [];
    if (allRequest.length !== 0) {
      allRequest.map((request, i) => {
        ids[i] = request.id;
      });
      setIdList(ids);
    }
  }, [allRequest]);

  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };

  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 아닌 값만 배열에 넣기
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  // console.log(CheckList);
  const walkerList = [];

  dogWalkerList.map((el) => (
    walkerList.push(el.name)
  ));

  // console.log(allRequest);

  const deleteClick = (id) => {
    if (allRequest.length === 0) {
      handleNotice(true);
      handleMessage('취소할 요청이 없습니다.');
    } else {
      handleNotice(true);
      handleMessage(`정말 요청을 취소하시겠습니까?!${id}`);
    }
  };

  const deleteSelected = (id) => {
    if (allRequest.length === 0) {
      handleNotice(true);
      handleMessage('취소할 요청이 없습니다.');
    } else if (CheckList.length === 0) {
      handleNotice(true);
      handleMessage('취소할 요청을 선택해주세요.');
    } else {
      handleNotice(true);
      handleMessage(`정말 요청을 취소하시겠습니까?!${id}`);
    }
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

  const handleExpiredDelete = () => {
    if (allRequest.length === 0) {
      handleNotice(true);
      handleMessage('삭제할 요청이 없습니다.');
    } else {
      const expiredRequest = [];

      allRequest.forEach((el) => {
        if (isExpired(el.date, el.time) === '요청 만료') {
          expiredRequest.push(el.id);
        }
      });
      console.log(expiredRequest);

      if (expiredRequest.length === 0) {
        handleNotice(true);
        handleMessage('만료된 요청이 없습니다.');
      } else {
        // axios
        //   .delete(process.env.REACT_APP_API_URL + '/request', {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       'Content-Type': 'application/json'
        //     },
        //     data: {
        //       serviceId: expiredRequest
        //     }
        //   })
        //   .then((res) => {
        //     if (res.status === 200) {
        //       handleNotice(true);
        //       handleMessage('요청이 취소되었습니다.');
        //     }
        //   })
        //   .catch((error) => {
        //     if (error.response.status === 410) {
        //       modal();
        //     } else console.log(error.response.data.message);
        //   });
        // window.location.reload();
      }
    }
  };

  const handleSearchClicked = () => {
    history.push({
      pathname: '/search'
    });
  };

  return (
    <MyRequestWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          <div className='field-container'>
            <label className='all'>
              <input
                type='checkbox'
                className='select-all'
                onChange={onChangeAll}
                checked={!allRequest.length ? false : CheckList.length === IdList.length}
              />
              <div className='description' style={{ cursor: 'pointer' }}>전체선택</div>
            </label>
            <div className='delete-bnt description expired' onClick={handleExpiredDelete}>
              만료내역삭제
              <span className='separator'>|</span>
            </div>
            <div className='delete-bnt description select' onClick={() => deleteSelected(CheckList)}>선택요청취소</div>
          </div>
          {allRequest.length === 0
            ? <div>
              <div className='no-items'>아직 요청 내역이 없습니다. {'\n'} 내 주변 도크워커를 찾아보세요!</div>
              <button className='search-bnt' onClick={handleSearchClicked}>도그워커 찾기</button>
              </div>
            : allRequest.map((el, idx) => {
              return (
                <div className='card' key={idx}>
                  <input
                    type='checkbox'
                    className='select-one'
                    onChange={(e) => onChangeEach(e, el.id)}
                    checked={CheckList.includes(el.id)}
                  />
                  <img className='dogwalker-img' src={el.img} alt={el.name} onClick={() => handleClick(el.dogwalkerId)} />
                  <div className='name'>{el.name}</div>
                  <div className='info'>{el.date} {el.time} {el.location}</div>
                  <div className='type'>{el.type}  <span>|</span> {el.duration}분 / {addComma(el.price)}원</div>
                  {/* <div className='status'>{el.status === 'pending' ? '요청 처리 중' : '요청 만료'}</div> */}
                  <div className='status'>{isExpired(el.date, el.time)}</div>
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
