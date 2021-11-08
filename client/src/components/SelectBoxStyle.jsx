import { Colors } from './utils/_var';

export const customStyles = {
  menu: (base) => ({
    ...base,
    // width: '10rem',
    marginTop: 0
  }),
  option: (provided, state) => ({
    ...provided,
    // width: '10rem',
    color: state.isSelected ? 'black' : Colors.darkGray
    // backgroundColor: state.isSelected ? 'black' : Colors.darkGray,
  }),
  control: (base) => ({
    ...base,
    // width: '10rem',
    border: `1px solid ${Colors.mediumGray}`,
    boxShadow: 'none',
    '&:hover': {
      border: `1px solid ${Colors.mediumGray}`
    }
  })
};
