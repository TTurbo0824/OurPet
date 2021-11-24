import styled from 'styled-components';
import Select from 'react-select';
import { customStyles, Description } from '../../components/SelectBoxStyle';
const TypePickerWrapper = styled.div``;

function TypeSelector ({ dogType, requestOptions, setRequestOptions, chargeList }) {
  const setType = (e) => {
    if (requestOptions.duration === 30) {
      setRequestOptions({ ...requestOptions, price: chargeList[chargeList.indexOf(e.value) + 1], type: e.value });
    } else if (requestOptions.duration === 60) {
      setRequestOptions({ ...requestOptions, price: chargeList[chargeList.indexOf(e.value) + 2], type: e.value });
    } else {
      setRequestOptions({ ...requestOptions, type: e.value });
    }
  };

  const options = dogType.map((type) => {
    return { value: type, label: type };
  });

  return (
    <TypePickerWrapper>
      <div className='type-container'>
        <Description>반려동물 종류</Description>
        <Select
          onChange={setType}
          styles={customStyles}
          isSearchable={false}
          placeholder='반려동물 선택'
          options={options}
        />
      </div>
    </TypePickerWrapper>
  );
}

export default TypeSelector;
