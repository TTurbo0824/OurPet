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
    margin: 1rem auto auto;
  }
  .field-container {
    display: grid;
    padding-bottom: .1rem;
    border-bottom: 1px solid ${Colors.lightGray};
    grid-template-areas:
      'alls expired select';
    grid-template-columns: 1fr 1fr 4rem;
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
    grid-template-columns: 1.5rem 7.25rem 50% 15% 15%;
    margin: .3rem auto;
    width: 40rem;
    padding-bottom: .4rem;
    border-bottom: 1px solid ${Colors.lightGray};
  }
  .card:first-of-type {
    border-top: none;
  }
  .select-one {
    grid-area: check;
    background-color: lime;
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
  let allRequest = useSelector((state) => state.request).dogWalkerRequest;
  const [isLoading, setIsLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [IdList, setIdList] = useState([]);
  const [CheckList, setCheckList] = useState([]);

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
        if (error.response.status === 401) {
          modal();
        } else if (error.response.status === 404) {
          setIsLoading(false);
        } else {
          console.log('error: ', error.response.data.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ids = [];
    if (allRequests.length !== 0) {
      allRequests.map((request, i) => {
        ids[i] = request.id;
      });
      setIdList(ids);
    }
  }, [allRequests]);

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

  const handleRequestDelete = () => {
    if (CheckList.length > 0) {
      axios
        .delete(process.env.REACT_APP_API_URL + '/request', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: {
            serviceId: CheckList
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch(console.log);
    } else {
      handleNotice(true);
      handleMessage('요청을 선택해주세요.');
    }
  };

  const handleExpiredDelete = () => {
    const expiredRequest = [];

    allRequests.forEach((el) => {
      if (el.status === 'expired') {
        expiredRequest.push(el.id);
      }
    });
    console.log(expiredRequest);

    // if (CheckList.length > 0) {
    //   axios
    //     .delete(process.env.REACT_APP_API_URL + '/request', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       },
    //       data: {
    //         serviceId: CheckList
    //       }
    //     })
    //     .then(() => {
    //       window.location.reload();
    //     })
    //     .catch(console.log);
    // } else {
    //   handleNotice(true);
    //   handleMessage('만료된 요청이 없습니다.');
    // }
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
                checked={!allRequests.length ? false : CheckList.length === IdList.length}
              />
              <div className='description' style={{ cursor: 'pointer' }}>전체선택</div>
            </label>
            <div className='delete-bnt description expired' onClick={handleExpiredDelete}>
              만료내역삭제
              <span className='separator'>|</span>
            </div>
            <div className='delete-bnt description select' onClick={handleRequestDelete}>선택삭제</div>
          </div>

          {allRequests.length === 0
            ? <div>결과 없음</div>
            : allRequests.map((el, idx) => {
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
                  <div className='status'>{el.status === 'pending' ? '요청 처리 중' : '요청 만료'}</div>
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
