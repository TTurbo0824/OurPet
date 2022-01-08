import styled from 'styled-components';
import Select from 'react-select';
import { customStyles, Description } from '../../components/SelectBoxStyle';

const DurationPickerWrapper = styled.div`
  width: 50%;
  padding-left: .45rem;
`;

function DurationSelector ({ requestOptions, setRequestOptions, chargeList }) {
  const durationSelected = (e) => {
    if (requestOptions.type !== '') {
      if (e.value === 30) {
        setRequestOptions({ ...requestOptions, price: chargeList[chargeList.indexOf(requestOptions.type) + 1], duration: e.value });
      } else if (e.value === 60) {
        setRequestOptions({ ...requestOptions, price: chargeList[chargeList.indexOf(requestOptions.type) + 2], duration: e.value });
      }
    } else {
      setRequestOptions({ ...requestOptions, duration: e.value });
    }
  };

  const options = [
    { value: 30, label: '30분' },
    { value: 60, label: '60분' }
  ];

  return (
    <DurationPickerWrapper>
      <Description>산책 시간</Description>
      <Select
        onChange={durationSelected}
        styles={customStyles}
        isSearchable={false}
        placeholder='시간 선택'
        options={options}
      />
    </DurationPickerWrapper>
  );
}

export default DurationSelector;
