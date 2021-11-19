import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';
import logo from '../images/logo_white.png';
const FooterWrapper = styled.div`
  .footer {
    padding: 1rem 0.5rem ;
    background-color: ${Colors.black};
    width: 100vw;
  }
  .container {
    justify-content: center;
    margin: 0 auto;
    text-align: center;
  }
  .logo-image {
    width: 8.5rem;
  }
  .link-container {
    margin: .8rem auto;
  }
  .link {
    cursor: pointer;
    text-decoration: none;
    color: ${Colors.lightGray};
    font-size: 1.5rem;
    margin: auto .5rem;
    &:hover {
      color: ${Colors.lightYellow};
    }
  }
  .copyright {
    text-decoration: none;
    color: ${Colors.mediumGray};
    min-width: 24rem;
    margin-right: .25rem;
    text-align: right;
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
        <div className='container'>
          <a
            className='link'
            href='https://github.com/TTurbo0824/WalkingDog'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={logo} className='logo-image' alt='logo_img' />
          </a>
          {/* <div className='link-container'>
            <a
              className='link'
              href='https://github.com/TTurbo0824/WalkingDog'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faGithub} size='1x' color={Colors.lightGray} />
            </a>
          </div> */}
          <div>
            <span className='copyright'>
              &copy; {`Kyungjoo Ha ${new Date().getFullYear()}`}
            </span>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
