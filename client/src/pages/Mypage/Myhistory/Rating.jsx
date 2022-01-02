import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { giveRating } from '../../../redux/action';
import axios from 'axios';
import { Colors } from '../../../components/utils/_var';
import { Backdrop, Alertbox } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
import Select from 'react-select';
import { customStyles } from '../../../components/SelectBoxStyle';
import { options, HistoryButton, RatingView } from '../../../components/MyPageComponents';

function Rating ({ handleModal, handleMessage, handleNotice, historyInfo, token, modal }) {
  const dispatch = useDispatch();
  const { historyId } = historyInfo;
  const [walkerRate, setWalkerRate] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  // console.log(historyId);

  const setRating = (e) => {
    setWalkerRate(e.value);
  };

  const ratingInfo = {
    id: historyId,
    rating: walkerRate
  };

  const handleRating = () => {
    if (walkerRate) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/rating`, ratingInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            handleModal();
            handleNotice(true);
            handleMessage('평점이 등록되었습니다.');
            dispatch(giveRating(ratingInfo));
          }
        })
        .catch((error) => {
          if (error.response.status === 410) {
            handleModal();
            modal();
          } else {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
            console.log('error: ', error.response.data.message);
          }
        });
    } else {
      setErrorMsg('평점을 선택해 주세요');
    }
  };

  return (
    <Backdrop>
      <RatingView>
        <CloseButton onClick={handleModal} />
        <div className='rating-des'>서비스에 만족하셨나요?</div>
        <div className='rating-container'>
          <Select
            onChange={setRating}
            styles={customStyles}
            isSearchable={false}
            placeholder='평점 선택'
            options={options}
            maxMenuHeight={125}
          />
        </div>
        <HistoryButton bntColor={Colors.gray} onClick={handleModal}>취소</HistoryButton>
        <HistoryButton bntColor={Colors.lightYellow} onClick={handleRating}>등록</HistoryButton>
        <Alertbox>{errorMsg}</Alertbox>
      </RatingView>
    </Backdrop>
  );
}

export default Rating;
