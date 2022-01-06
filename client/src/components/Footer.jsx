import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Colors } from '../components/utils/_var';
import { media } from './utils/_media-queries';
import logo from '../images/logo_white.png';

const FooterWrapper = styled.div`
  .footer {
    width: 100vw;
    padding: 1.25rem 2.5rem 1.75rem;
    ${media.tablet`padding: 2rem 2.5rem;`}
    background-color: ${Colors.black};
  }
  .footer-container {
    display: grid;
    grid-template-areas: 'logo' 'cols';
    ${media.tablet`grid-template-areas: 'logo cols' 'copyright cols';`}
    grid-template-columns: 1fr;
    ${media.tablet`grid-template-columns: 1fr 30rem;`}
  }
  .logo-image {
    grid-area: logo;
    cursor: pointer;
    width: 10.5rem;
    justify-content: center;
    margin: 0 auto;
    ${media.tablet`width: 11rem; justify-content: left; margin: 1.1rem 0 0;`}
  }
  a {
    text-decoration: none;
    color: ${Colors.mediumGray};
    :active, :visited {
      color: ${Colors.mediumGray};
    }
  }
  .copyright {
    grid-area: copyright;
    display: flex;
    justify-content: center;
    color: ${Colors.mediumGray};
    margin-top: 1rem;
    ${media.tablet`margin-top: 5rem; justify-content: left;`}
  }
  .footer-table {
    grid-area: cols;
    color: ${Colors.mediumGray};
    display: flex;
    text-align: left;
    justify-content: center;
    margin: 1rem auto 2rem;
    display: none;
    ${media.tablet`display: flex;`}
  }
  .left-col {
    margin-right: 5rem;
  }
  .right-col {
    margin-left: 5rem;
  }
  .col-label {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: .5rem;
  }
  .item {
    cursor: pointer;
    font-size: .95rem;
    margin-bottom: .25rem;
    :hover {
      color: ${Colors.lightYellow};
    }
  }  
`;

function Footer ({ login, signup, handleNotice, handleMessage }) {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user).token;

  const goToMyPage = () => {
    window.location.replace('/mypage');
  };

  let userContent = <><div className='item' onClick={login}>로그인</div><div className='item' onClick={signup}>회원가입</div></>;
  if (isLogin !== '') {
    userContent = <div className='item' onClick={goToMyPage}>회원정보</div>;
  }

  const goToMain = () => {
    history.push({
      pathname: '/'
    });
  };

  const goSearch = () => {
    history.push({
      pathname: '/search'
    });
  };

  const notAvailable = () => {
    handleNotice(true);
    handleMessage('준비 중인 서비스입니다.');
  };

  return (
    <FooterWrapper>
      <div className='footer'>
        <div className='footer-container'>
          <img src={logo} onClick={goToMain} className='logo-image' alt='logo_img' />
          <div className='footer-table'>
            <div className='left-col'>
              <div className='col-label'>워킹도그 서비스</div>
              <div>
                <div className='item' onClick={goSearch}>도그워커 검색</div>
                <div className='item' onClick={notAvailable}>도그워커 지원하기</div>
                {userContent}
              </div>
            </div>
            <div className='right-col'>
              <div className='col-label'>서비스 정보</div>
              <div>
                <a
                  href='https://github.com/TTurbo0824/WalkingDog'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='item'>GitHub Repository</div>
                </a>
                <a
                  href='https://github.com/TTurbo0824'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='item'>개발자 하경주</div>
                </a>
                <a href='mailto:1813kh@gmail.com'><div className='item'>문의하기</div></a>
              </div>
            </div>
          </div>
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
