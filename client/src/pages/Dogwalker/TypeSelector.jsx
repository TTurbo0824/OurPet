import styled from 'styled-components';
import Select from 'react-select';
import { customStyles } from '../../components/SelectBoxStyle';
const TypePickerWrapper = styled.div``;

function TypeSelector ({ dogType, requestOptions, setRequestOptions }) {
  const setType = (e) => {
    setRequestOptions({ ...requestOptions, type: e.value });
  };

  const types = dogType.filter((type) => {
    if (type.length === 3) {
      return type;
    }
  });

  const options = types.map((type) => {
    return { value: type, label: type };
  });

  return (
    <TypePickerWrapper>
      <div className='type-container'>
        <div className='description'>언제 산책을 원하시나요?</div>
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
