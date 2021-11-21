import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import { Colors } from '../../components/utils/_var';
import styled from 'styled-components';

const DatePickerWrapper = styled.div`
  input {
    border: none;
    width: 100%;
    margin: 0 0.4rem 0.25rem;
    color: ${Colors.gray};
    font-size: 1rem;
  }
  .description {
    margin-bottom: .8rem;
  }
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.35rem;
  padding: 0 0.4rem;
  background-color: white;
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
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
        <FontAwesomeIcon icon={faCalendar} color={Colors.darkGray} size='1x' />
        <DatePicker
          selected={startDate}
          dateFormat='yyyy.MM.dd'
          onSelect={(date) => setStartDate(date)}
          onChange={(date) => dateSelected(date)}
          minDate={new Date()}
        />
      </DateContainer>
    </DatePickerWrapper>
  );
}

export default DateSelector;
