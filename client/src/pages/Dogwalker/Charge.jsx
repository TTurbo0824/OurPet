import styled from 'styled-components';

const ChargeWrapper = styled.div`
  table {
    width: 100%;
    border: 1px solid black;
  }
  tr {
    text-align: left;
  }
`;

function Charge ({ chargeList }) {
  return (
    <ChargeWrapper>
      <table>
        <thead>
          <tr>
            <th>이용 요금</th>
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
    </ChargeWrapper>
  );
}

export default Charge;
