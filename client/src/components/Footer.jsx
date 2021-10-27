import styled from 'styled-components';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';

const FooterWrapper = styled.div`
  .footer {
    padding: 2.25rem 0.8rem 0.5rem ;
    background-color: ${Colors.darkGray};
    width: 100vw;
  }
  .sub-container {
    display: flex;
  }
  .link,
  .copyright {
    color: ${Colors.lightGray};
  }
  .link {
    cursor: pointer;
    text-decoration: none;
    min-width: 14rem;
    margin: auto .25rem;
    &:hover {
      color: ${Colors.lightYellow};
    }
  }
  .copyright {
    min-width: 24rem;
    margin-right: .25rem;
    text-align: right;
  }
  .container-empty {
    width: 100%;
  }
`;

function Footer () {
  const developer = {
    name: '하경주',
    repository: 'https://github.com/TTurbo0824'
  };

  return (
    <FooterWrapper>
      <div className='footer'>
        <div className='sub-container'>
          <a
            className='link'
            href='https://github.com/TTurbo0824/WalkingDog'
            target='_blank'
            rel='noopener noreferrer'
          >
            WalkingDog Repository Link
          </a>
          <div className='container-empty' />
          <span className='copyright'>
            copyright &copy; {new Date().getFullYear()}
            <a
              className='link'
              href={developer.repository}
              target='_blank'
              rel='noopener noreferrer'
            >
              Kyungjoo Ha
            </a>
            All rights reserved.
          </span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
