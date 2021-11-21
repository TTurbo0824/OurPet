import styled from 'styled-components';
import Select from 'react-select';
import { customStyles, Description } from '../../components/SelectBoxStyle';
const LocationPickerWrapper = styled.div``;

function LocationSelector ({ locations, requestOptions, setRequestOptions }) {
  const setLocation = (e) => {
    setRequestOptions({ ...requestOptions, location: e.value });
  };

  const options = locations.map((location) => {
    return { value: location, label: location };
  });

  return (
    <LocationPickerWrapper>
      <div className='type-container'>
        <Description>어디에서 산책을 원하시나요?</Description>
        <Select
          onChange={setLocation}
          styles={customStyles}
          isSearchable={false}
          placeholder='장소 선택'
          options={options}
        />
      </div>
    </LocationPickerWrapper>
  );
}

export default LocationSelector;
