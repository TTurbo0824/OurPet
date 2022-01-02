import styled from 'styled-components';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';

export const Alertbox = styled.div`
  color: red;
  font-size: .85rem;
  margin-top: .5rem;
  ${media.tabletMini`font-size: .9rem;`}
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  height: 100%;
`;

export const InputField = styled.input`
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  color: ${Colors.darkGray};
  padding: .5rem 1rem;
  margin-bottom: .5rem;
  width: 13rem;
  height: 2rem;
  /* ${media.tabletMini`width: 13rem; `} */
  ${media.tablet`width: 13.5rem; height: 2.2rem;`}
  :focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;
