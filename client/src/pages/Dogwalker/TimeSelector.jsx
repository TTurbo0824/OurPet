import styled from 'styled-components';
import Time from '../../database/Time';
import Select from 'react-select';
import { customStyles, Description } from '../../components/SelectBoxStyle';

const TimePickerWrapper = styled.div`
  width: 50%;
  padding-right: .45rem;
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
      <Description>시작 시간</Description>
      <Select
        onChange={timeSelected}
        styles={customStyles}
        isSearchable={false}
        placeholder='시간 선택'
        options={options}
      />
    </TimePickerWrapper>
  );
}

export default TimeSelector;
