import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media';

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 21rem; */
  width: 80%;
  ${media.tablet`width: 21rem;`}
  ${media.laptop`width: 28rem;`}
  height: 2.35rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  background-color: white;
  border: 1px solid ${Colors.mediumGray};
  border-radius: 4px;

  input {
    font-size: 1rem;
    color: ${Colors.gray};
  }
`;

function DateSelector () {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DateContainer>
      <FontAwesomeIcon
        style={{ marginRight: '.3rem' }}
        icon={faCalendar}
        color={Colors.darkGray}
        size='1x'
      />
      <DatePicker
        selected={startDate}
        dateFormat='yyyy.MM.dd'
        onChange={(date) => setStartDate(date)}
      />
    </DateContainer>
  );
}

export default DateSelector;
