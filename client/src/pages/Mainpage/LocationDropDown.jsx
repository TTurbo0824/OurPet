import styled from 'styled-components';
import Select from 'react-select';
import Locations from '../../database/Locations';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';

const LocationWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  ${media.tablet`width: 21rem; margin-bottom: 3rem;`}
  ${media.laptop`width: 28rem;`}
`;

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
      marginBottom: 14,
      height: '10px',
      width: '10px'
    }
  });

  const customStyles = {
    menu: (base) => ({
      ...base,
      marginTop: 0
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: state.isSelected ? 'black' : Colors.darkGray
    }),
    control: (base) => ({
      ...base,
      cursor: 'pointer',
      border: `1px solid ${Colors.lightGray}`,
      boxShadow: 'none',
      '&:hover': {
        border: `1px solid ${Colors.lightGray}`
      }
    }),
    input: (styles) => ({ ...styles, ...icon('hidden'), height: '2.25rem' }),
    placeholder: (styles) => ({ ...styles, ...icon() }),
    singleValue: (styles) => ({ ...styles, ...icon() })
  };

  return (
    <LocationWrapper>
      <Select
        onChange={selectLocation}
        styles={customStyles}
        placeholder='구 이름을 검색하세요. (예: 강남구)'
        options={options}
      />
    </LocationWrapper>
  );
}

export default LocationDropDown;
