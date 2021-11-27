import { Colors } from './utils/_var';
import styled from 'styled-components';

export const customStyles = {
  menu: (base) => ({
    ...base,
    // width: '10rem',
    marginTop: 0
  }),
  option: (provided, state) => ({
    ...provided,
    // width: '10rem',
    cursor: 'pointer',
    color: state.isSelected ? 'black' : Colors.darkGray
    // backgroundColor: state.isSelected ? 'black' : Colors.darkGray,
  }),
  control: (base) => ({
    ...base,
    // width: '10rem',
    cursor: 'pointer',
    border: `1px solid ${Colors.lightGray}`,
    boxShadow: 'none',
    '&:hover': {
      border: `1px solid ${Colors.lightGray}`
    }
  })
};

export const Description = styled.div`
  margin-top: 1.3rem;
  margin-bottom: .5rem;
`;
