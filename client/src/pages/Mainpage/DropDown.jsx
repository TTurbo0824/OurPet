import styled from 'styled-components';

export const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
  list-style-type: none;
  width: 21rem;
  margin-top: -1px;
  padding: 0.5rem 0.3rem;
  border: 1px solid rgb(223, 225, 229);
  z-index: 3;
  cursor: pointer;

  > li {
    font-size: .9rem;
    /* background-color: pink; */
    width: 20rem;
  }
`;

const DropDown = ({ options, handleDropDownClick }) => {
  return (
    <DropDownContainer>
      {options.map((option, index) => (
        <li key={index} onClick={() => handleDropDownClick(option)}>
          {option}
        </li>
      ))}
    </DropDownContainer>
  );
};

export default DropDown;
