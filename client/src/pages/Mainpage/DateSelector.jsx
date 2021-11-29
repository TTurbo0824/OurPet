import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import './date-picker.css';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ko } from 'date-fns/esm/locale';

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  ${media.tablet`width: 21rem;`}
  ${media.laptop`width: 28rem;`}
  height: 2.35rem;
  padding: 0 0.7rem;
  font-size: 1.1rem;
  background-color: white;
  border: 1px solid ${Colors.mediumGray};
  border-radius: 4px;
  input {
    font-size: 1rem;
    color: ${Colors.gray};
  }
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

function DateSelector () {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DateContainer>
      <DatePicker
        locale={ko}
        showPopperArrow={false}
        selected={startDate}
        dateFormat='yyyy.MM.dd'
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className='date-customheader'>
            <button className='nav-button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <FontAwesomeIcon className='nav-icon' icon={faChevronLeft} size='1x' />
            </button>
            <div className='custom-heading'>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </div>
            <button className='nav-button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <FontAwesomeIcon className='nav-icon' icon={faChevronRight} size='1x' />
            </button>
          </div>
        )}
      />
    </DateContainer>
  );
}

export default DateSelector;
