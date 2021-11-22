import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../components/utils/_var';

const MoveTopWrapper = styled.div`
  justify-content: right;
  padding: 1.5rem;
  position: fixed;
  top: 90vh;
  right: -.5rem;
  .icon-container {
    cursor: pointer;
    display: flex;
    width: 2rem;
    height: 2rem;
    border-radius: 50px;
    border: 1px solid ${Colors.mediumGray};
    justify-content: center;
    background-color: white;
  }
  .top-icon {
    font-size: 1.3rem;
    margin-top: .25rem;
    color:  ${Colors.gray};
  }
`;

function MoveTop ({ moveToTop }) {
  return (
    <MoveTopWrapper>
      <div onClick={moveToTop} className='icon-container'>
        <FontAwesomeIcon className='top-icon' icon={faAngleDoubleUp} />
      </div>
    </MoveTopWrapper>
  );
}

export default MoveTop;
