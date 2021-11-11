import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';

export const RatingView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
`;

function Rating( {handleModal} ) {
  return (
    <Backdrop>
      <RatingView>
      <CloseButton onClick={handleModal} />
        Rating
      </RatingView>
    </Backdrop>
  );
}

export default Rating;
