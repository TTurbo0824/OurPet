import styled from 'styled-components';
import TypeWriterEffect from 'typewriter-effect';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';

const PageLoadingWrpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.darkGray};
  font-size: 1rem;
  ${media.tablet`font-size: 1.2rem;`}
`;

export function PageLoading () {
  return (
    <PageLoadingWrpper>
      <TypeWriterEffect
        onInit={(typewriter) => {
          typewriter
            .typeString('로딩 중입니다...')
            .pauseFor(1000)
            .start();
        }}
      />
    </PageLoadingWrpper>
  );
}
