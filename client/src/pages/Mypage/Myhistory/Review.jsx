import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Alertbox, Backdrop, InputField } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';

export const ReviewView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
`;

function Review({ handleModal }) {
  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleModal} />
        Review
      </ReviewView>
    </Backdrop>
  );
}

export default Review;
