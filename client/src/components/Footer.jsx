import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';

const FooterWrapper = styled.div`
  .footer {
    padding: 0.3rem 0.8rem;
    background-color: ${Colors.darkGray};
    width: 100vw;
  }
  .sub-container {
    display: flex;
  }
  .link-label,
  .link,
  .copyright {
    color: ${Colors.lightGray};
  }
  .link {
    cursor: pointer;
    text-decoration: none;
    min-width: 4.8rem;
    padding: 0.2rem 0 0 0.25rem;
    margin-bottom: 0.5rem;
    &:hover {
      color: ${Colors.lightYellow};
    }
  }
  .link-label {
    min-width: 7rem;
    padding: 0.1rem 0 0 0.25rem;
    text-align: left;
  }
  .copyright {
    min-width: 23rem;
    margin-right: 0;
    text-align: right;
  }
  .link-container {
    display: flex;
    padding: 0;
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
        </div>
        <div className='sub-container'>
          <div className='link-container'>
            <div className='link-label'>Developed by</div>
            <a
              className='link'
              href={developer.repository}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon
                icon={faGithub}
                size='1x'
                color={Colors.lightGray}
              />{' '}
              {developer.name}
            </a>
          </div>
          <div className='container-empty' />
          <span className='copyright'>
            copyright &copy; {new Date().getFullYear()} Kyungjoo Ha All rights
            reserved.
          </span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
