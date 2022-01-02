import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colors } from '../../components/utils/_var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ko } from 'date-fns/esm/locale';

const DatePickerWrapper = styled.div`
  input {
    border: none;
    width: 100%;
    color: ${Colors.gray};
    font-size: .98rem;
  }
  .description {
    margin-bottom: .8rem;
  }
  .react-datepicker__header {
    background-color: #ffffff;
  }
  .react-datepicker {
    font-size: .85rem;
    border: 1px solid #e0e2e3;
    background-color: #fff;
    color: #000;
    border-radius: .3rem;
    display: inline-block;
    position: relative;
    padding: .7rem 1.2rem 1.2rem;
    margin-top: .75rem;
  }
  .custom-heading {
    color: ${Colors.black};
    font-size: 1rem;
    margin-bottom: .2rem;
  }
  .react-datepicker__day--selected {
    border-radius: .3rem;
    background-color: ${Colors.yellow};
    color: #fff;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${Colors.yellow};
  }
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.35rem;
  padding: 0 .7rem;
  background-color: white;
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  .date-customheader {
    display: flex;
    justify-content: center;
    margin: .5rem auto;
  }
  .nav-button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .nav-icon {
    margin: 0 1.5rem;
  }
  .custom-heading {
    font-size: .9rem;
    font-weight: bold;
  }
`;

function DateSelector ({ requestOptions, setRequestOptions }) {
  const [startDate, setStartDate] = useState(new Date());
  const dateSelected = (date) => {
    const moment = require('moment');
    date = moment(date).format('YYYY.MM.DD');
    setRequestOptions({ ...requestOptions, date: date });
  };

  return (
    <DatePickerWrapper>
      <div className='description'>언제 산책을 원하시나요?</div>
      <DateContainer>
        <DatePicker
          locale={ko}
          showPopperArrow={false}
          selected={startDate}
          dateFormat='yyyy.MM.dd'
          onSelect={(date) => setStartDate(date)}
          onChange={(date) => dateSelected(date)}
          minDate={new Date()}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div className='date-customheader'>
              <button
                className='nav-button'
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <FontAwesomeIcon className='nav-icon' icon={faChevronLeft} size='1x' />
              </button>
              <div className='custom-heading'>
                {date.getFullYear()}년 {date.getMonth() + 1}월
              </div>
              <button
                className='nav-button'
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <FontAwesomeIcon className='nav-icon' icon={faChevronRight} size='1x' />
              </button>
            </div>
          )}
        />
      </DateContainer>
    </DatePickerWrapper>
  );
}

export default DateSelector;
