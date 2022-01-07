import styled from 'styled-components';
import { NoticeButton } from './Notification';
import { Colors } from '../components/utils/_var';
import { media } from './utils/_media-queries';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, getRequest, getHistory } from '../redux/action';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  height: 100vh;
`;

export const ModalView = styled.div`
  box-sizing: border-box;
  background-color: white;
  position: relative;
  text-align: center;
  color: ${Colors.darkGray};
  width: 15.75rem;
  height: 9.25rem;
  padding-top: 1.2rem;
  box-shadow: 8px 8px grey;
  ${media.tabletMini`font-size: .95rem; width: 16.2rem; height: 9.5rem;`}
  ${media.tablet`font-size: 1rem; width: 16.5rem;`}
  ${media.tablet`box-shadow: 10px 10px grey;`}
`;

const Content = styled.div`
  color: ${Colors.black};
  margin: auto auto 0;
  margin-top: ${(props) => props.topMargin};
  padding: auto 0.3rem;
  font-size: .9rem;
  ${media.tabletMini`font-size: .95rem;`}
  ${media.tablet`font-size: 1rem;`}
`;

const LogOutButton = styled.button`
  cursor: pointer;
  margin-top: 0.5rem;
  background-color: ${Colors.gray};
  border: none;
  border-radius: 10px;
  width: 7rem;
  height: 1.7rem;
  padding-top: 0.1rem;
  font-size: 0.9rem;
  color: white;
  width: 6.5rem;
  ${media.tablet`font-size: .9rem; width: 7rem;`}
  :hover {
    background-color: ${Colors.black};
  }
`;

function Modal ({ handleModal, login }) {
  const nickname = useSelector((state) => state.user).walkingDogUserInfo.nickname;
  const isGuest = !!nickname.includes('guest#');
  const dispatch = useDispatch();
  const goLogin = () => {
    handleModal();
    login();
  };

  const logout = () => {
    dispatch(userLogout());
    dispatch(getRequest([]));
    dispatch(getHistory([]));
    localStorage.clear();
    handleModal();
    window.location.replace('/');
  };

  return (
    <ModalBackdrop>
      <ModalView>
        {!isGuest
          ? <>
            <Content topMargin='0.4rem'>[토큰 만료] 재로그인 하시겠습니까?</Content>
            <NoticeButton onClick={goLogin}>로그인</NoticeButton>
            <div>
              <LogOutButton onClick={logout}>로그아웃</LogOutButton>
            </div>
            </>
          : <>
            <Content topMargin='1.6rem'>체험하기가 종료되었습니다.</Content>
            <NoticeButton
              onClick={logout}
            >
              메인화면으로
            </NoticeButton>
            </>}
      </ModalView>
    </ModalBackdrop>
  );
}

export default Modal;
