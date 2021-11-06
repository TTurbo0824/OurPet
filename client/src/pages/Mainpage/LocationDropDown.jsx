import styled from 'styled-components';
import Select from 'react-select';
// import { customStyles } from '../../components/SelectBoxStyle';
import Locations from '../../database/Locations';
import { Colors } from '../../components/utils/_var';

function LocationDropDown ({ setLocation }) {
  const selectLocation = (e) => {
    const selectedLocation = e.value.split(' ')[1];

    setLocation(selectedLocation);
  };

  const options = Locations.map((location) => {
    return { value: location, label: location };
  });

  const icon = (display = 'inline-block') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      content: 'url("/images/Search_Icon.png")',
      transform: 'scale(.014)',
      display: display,
      marginRight: 18,
      marginBottom: 12,
      height: '10px',
      width: '10px',
      backgroundSize: 'contain'
    }
  });

  const customStyles = {
    menu: (base) => ({
      ...base,
      marginTop: 0
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : Colors.darkGray
      // backgroundColor: state.isSelected ? 'black' : Colors.darkGray,
    }),
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 'none'
    }),
    input: (styles) => ({ ...styles, ...icon('hidden') }),
    placeholder: (styles) => ({ ...styles, ...icon() }),
    singleValue: (styles) => ({ ...styles, ...icon() })
  };

  return (
    <Select
      onChange={selectLocation}
      styles={customStyles}
      placeholder='구 이름을 검색하세요. (예: 강남구)'
      options={options}
    />
  );
}

export default LocationDropDown;
