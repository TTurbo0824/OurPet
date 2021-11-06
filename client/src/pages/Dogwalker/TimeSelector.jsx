import styled from 'styled-components';
import Time from '../../database/Time';
import Select from 'react-select';
import { customStyles } from '../../components/SelectBoxStyle';
const TimePickerWrapper = styled.div`
`;

function TimeSelector ({ requestOptions, setRequestOptions }) {
  const timeSelected = (e) => {
    setRequestOptions({ ...requestOptions, time: e.value });
  };

  const options = Time.map((time) => {
    return { value: time, label: time };
  });

  return (
    <TimePickerWrapper>
      <div className='time-container'>
        <div className='description'>언제 산책을 원하시나요?</div>
        <Select
          onChange={timeSelected}
          styles={customStyles}
          isSearchable={false}
          placeholder='시간 선택'
          options={options}
        />
      </div>
    </TimePickerWrapper>
  );
}

export default TimeSelector;
