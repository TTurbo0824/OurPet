import styled from 'styled-components';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';

export const Logo = styled.img`
  width: 6.75rem;
  margin: .85rem auto .5rem;
  ${media.tabletMini`width: 7rem; margin: .9rem auto .5rem;`}
  ${media.tablet`width: 7.5rem; margin: 1rem auto .8rem;`}
`;
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
  ${media.tablet`width: 13.5rem; height: 2.2rem;`}
  :focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;
