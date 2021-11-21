import styled from 'styled-components';
import Select from 'react-select';
import { customStyles, Description } from '../../components/SelectBoxStyle';
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
