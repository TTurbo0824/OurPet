import { Colors } from './utils/_var';

export const customStyles = {
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
  })
};
