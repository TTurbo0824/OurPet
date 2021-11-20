import styled from 'styled-components';
import Select from 'react-select';
import { customStyles } from '../../components/SelectBoxStyle';
const DurationPickerWrapper = styled.div``;

function DurationSelector ({ requestOptions, setRequestOptions }) {
  const durationSelected = (e) => {
    setRequestOptions({ ...requestOptions, duration: e.value });
  };

  const options = [
    { value: 30, label: '30분' },
    { value: 60, label: '60분' }
  ];

  return (
    <DurationPickerWrapper>
      <div className='time-container'>
        <div className='description'>산책 시간</div>
        <Select
          onChange={durationSelected}
          styles={customStyles}
          isSearchable={false}
          placeholder='시간 선택'
          options={options}
        />
      </div>
    </DurationPickerWrapper>
  );
}

export default DurationSelector;
