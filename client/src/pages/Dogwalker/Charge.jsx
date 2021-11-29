import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';

const ChargeWrapper = styled.div`
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  box-shadow: 2px 2px 3px ${Colors.lightGray};
  margin-bottom: 2rem;
  padding: 1.5rem;
  table {
    width: 100%;
  }
  tr {
    text-align: left;
    color: ${Colors.darkGray};
  }
  th {
    /* color: ${Colors.darkGray}; */
    font-weight: normal;
    color: black;
    padding-bottom: .8rem;
  }
  td {
    padding-bottom: .2rem;
  }
  .title {
    font-weight: bold;
    font-size: 1rem;
  }
  .h-line {
    width: 100%;
    height: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgb(175, 175, 175, 0.4);
  }
  .type-container {
    margin-top: .5rem;
  }
  .type {
    padding-left: .2rem;
    margin-right: 4.5rem;
  }
  .weight {
    color: ${Colors.darkGray};

  }
`;

function Charge ({ chargeList }) {
  chargeList = chargeList.map((charge) => {
    if (typeof charge === 'number') {
      charge = String(charge).split('');
      charge.push('원');
      charge.splice(-4, 0, ',');
      charge = charge.join('');
    }
    return charge;
  });

  const dogType = [{ 소형견: '7kg 미만' }, { 중형견: '7~14.9kg' }, { 대형견: '15kg 이상' }];

  return (
    <ChargeWrapper>
      <table>
        <thead>
          <tr>
            <th><span className='title'>이용 요금</span></th>
            <th>30분</th>
            <th>1시간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {chargeList.map((charge, idx) => {
              return idx / 3 < 1 ? <td key={idx}>{charge}</td> : null;
            })}
          </tr>
          <tr>
            {chargeList.map((charge, idx) => {
              return idx / 3 < 2 && idx / 3 >= 1 ? <td key={idx}>{charge}</td> : null;
            })}
          </tr>
          <tr>
            {chargeList.map((charge, idx) => {
              return idx / 3 < 3 && idx / 3 >= 2 ? <td key={idx}>{charge}</td> : null;
            })}
          </tr>
        </tbody>
      </table>
      <div className='h-line' />
      {dogType.map((el, idx) =>
        <div className='type-container' key={idx}>
          <span className='type'>{Object.keys(el)}</span>
          <span className='weight'>{Object.values(el)}</span>
        </div>)}
    </ChargeWrapper>
  );
}

export default Charge;
