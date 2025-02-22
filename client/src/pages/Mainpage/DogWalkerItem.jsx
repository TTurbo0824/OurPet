import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';

const DogWalkerWrapper = styled.div`
  .dogwalker-card {
    cursor: pointer;
    display: grid;
    grid-template-areas:
      'img location location'
      'img nickname nickname'
      'img hl hl'
      'img tag tag'
      'img rating price';
    grid-template-columns: 8.75rem 1fr 1fr;
    ${media.tabletMini`grid-template-columns: 10rem 1fr 1fr;`}
    ${media.tablet`grid-template-columns: 15rem 1fr 1fr;`}
    width: 90vw;
    max-width: 62rem;
    background-color: white;
    border: solid rgb(238, 238, 238) 0.1rem;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 2px ${Colors.lightGray};
    margin-bottom: 2rem;
    padding: 0.5rem;
  }
  .dogwalker-img {
    grid-area: img;
    width: 7.5rem;
    height: 7.5rem;
    ${media.tabletMini`width: 9rem; height: 9rem;`}
    ${media.tablet`width: 13.25rem; height: 13.25rem;`}
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
    align-self: center;
  }
  .dogwalker-location {
    grid-area: location;
    font-weight: 700;
    margin-top: .3rem;
    margin-bottom: .25rem;
    font-size: .9rem;
    ${media.tabletMini`margin-top: .5rem;`}
    ${media.tablet`font-size: 1rem; margin-top: .8rem; margin-bottom: 0;`}
  }
  .dogwalker-name {
    grid-area: nickname;
    font-weight: 400;
    font-size: .95rem;
    ${media.tabletMini`font-size: 1rem;`}
  }
  .h-line {
    grid-area: hl;
    width: 97%;
    height: 1rem;
    border-top: 1px solid rgb(175, 175, 175, 0.4);
    display: none;
    margin-top: .35rem;
    ${media.tabletMini`display: flex;`}
    ${media.tablet`margin-top: 0;`}
  }
  .tag-container {
    grid-area: tag;
    height: 3rem;
    display: none;
    margin-right: .7rem;
    ${media.tabletMini`display: flex;`}
    ${media.tablet`margin-right: 0rem;;`}
    white-space: pre;
    overflow-x: scroll;
  }
  .tag {
    margin-right: .25rem;
    font-size: .9rem;
    ${media.tablet`font-size: 1rem;`}    
  }
  .tag:not(:last-child)::after {
    content: '·';
    margin-left: .25rem;
  }
  .rating-container {
    grid-area: rating;
    display: flex;
    align-items: center;
    align-self: center;
    padding-bottom: .4rem;
    ${media.tabletMini`padding-bottom: .5rem;`}
  }
  .count-people {
    display: none;
    ${media.tabletMini`display: inline-block;`}
  }
  .price {
    grid-area: price;
    align-self: center;
    padding-bottom: .4rem;
    ${media.tabletMini`padding-bottom: .5rem;`}
  }
`;

export default function Dogwalker ({ rating, minPrice, dogWalker, handleClick, tags }) {
  let walkerRating = rating.filter((el) => el.id === dogWalker.id);
  walkerRating = walkerRating[0].rating;
  const averageRating = (walkerRating.reduce((acc, cur) => acc + cur) / walkerRating.length).toFixed(1);

  minPrice = String(minPrice).split('');
  minPrice.splice(-3, 0, ',');

  return (
    <DogWalkerWrapper>
      <div className='dogwalker-card' key={dogWalker.id} onClick={(e) => handleClick(e)}>
        <img className='dogwalker-img' src={`/images/dog_images/dog_${dogWalker.id}.jpeg`} alt={dogWalker.name} />
        <span className='dogwalker-location'>{dogWalker.locations.join(' ')}</span>
        <span className='dogwalker-name'>
          {dogWalker.name}
        </span>
        <div className='h-line' />
        <div className='tag-container'>
          {tags.map((el, idx) =>
            <span key={idx} className='tag'>{el}</span>
          )}
        </div>
        <div className='rating-container'>
          <FontAwesomeIcon style={{ marginRight: '.3rem', color: Colors.yellow }} icon={faStar} size='1x' />
          <div>{averageRating} <span className='count-people'>({walkerRating.length})</span></div>
        </div>
        <div className='price'>₩{minPrice}+</div>
      </div>
    </DogWalkerWrapper>
  );
}
