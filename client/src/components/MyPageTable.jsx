import styled from 'styled-components';
import { Colors } from './utils/_var';

export const MyPageTable = styled.div`
  .no-items {
    text-align: center;
    margin: 2.5rem auto 2rem;
    white-space: pre-line;
  }
  .search-bnt {
    display: flex;
    margin: auto;
    padding: .75rem 1.25rem;
    cursor: pointer;
    background-color: ${Colors.lightYellow};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: .9rem;
    &:hover {
      background-color: ${Colors.yellow};
    }
  }
  .field-container {
    display: grid;
    padding-bottom: .1rem;
    border-bottom: 1px solid ${Colors.lightGray};
    width: 40rem;
  }
  .card {
    display: grid;
    grid-template-columns: 1.5rem 7.25rem 48% 15% 15%;
    border-bottom: 1px solid ${Colors.lightGray};
    margin: .3rem auto;
    padding-bottom: .4rem;
    width: 40rem;
  }
  .name {
    grid-area: title;
  }
  .info {
    grid-area: info;
  }
  .type {
    grid-area: type;
  }
  .name, .info, .type {
    font-size: .9rem;
  }
  .select-all {
    align-self: center;
  }
  .select-all, .select-one {
    cursor: pointer;
  }
  .select-one {
    grid-area: check;
  }
  .all {
    display: flex;
    grid-area: alls;
  }
  .select {
    grid-area: select;
    padding-right: .4rem;
  }
  .description {
    margin-left: .3rem;
    font-size: .83rem;
    color: ${Colors.darkGray};
    align-self: center;
    padding-bottom: .15rem;
  }
  .delete-bnt {
    cursor: pointer;
    display: flex;
    margin-right: 0;
    margin-left: auto;
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 6rem;
    height: 6rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .bnt {
    cursor: pointer;
    align-self: center;
    justify-self: center;
    padding: .4rem .7rem;
    font-size: .85rem;
    border: 1px solid ${Colors.mediumLightGray};
  }
`;
