import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../../redux/action';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import default_profile from '../../../images/default_profile.jpeg';
import { HistoryButton, ProfileImage, ReviewView } from '../../../components/MyPageComponents';
import { Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';

const ProfileImageWrapper = styled.div`
  margin: .75rem 0;
  .loading {
    width: 5rem;
    margin-top: 2.25rem;
  }
`;

const UploadLabel = styled.label`
  cursor: pointer;
  display: block;
  font-size: .85rem;
  margin: .3rem auto .8rem;
  color: ${Colors.darkGray};
  text-decoration: underline;
`;

function UserProfile ({ profile_url, token, handleMessage, handleNotice, modal, handleProfileClose }) {
  const dispatch = useDispatch();

  console.log(profile_url);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({
    file: '',
    previewURL: ''
  });

  const onLoadFile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFiles({
        file: file,
        previewURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  let profile_preview = null;
  if (files !== '') {
    profile_preview = <img className='review-profile' alt='profile-img' src={files.previewURL} />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', files.file);
    setIsLoading(true);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        const { url } = res.data.data;
        // console.log(res.data);
        setIsLoading(false);
        setFiles({ ...files, previewURL: url });
        dispatch(editProfile(url));
        handleProfileClose();
        handleNotice(true);
        handleMessage('프로필 사진이 수정되었습니다.');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          modal();
        } else {
          setIsLoading(false);
          handleProfileClose();
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
          console.log('error: ', error.response.data.message);
        }
      });
  };

  // console.log(files);

  console.log(isLoading);

  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleProfileClose} />
        <ProfileImageWrapper>
          <ProfileImage>
            {isLoading
              ? <img className='loading' src='images/loading_.gif' alt='loading' />
              : files.file !== ''
                ? profile_preview
                : <img className='review-profile' alt='profile-img' src={profile_url !== '' ? profile_url : default_profile} />}
          </ProfileImage>
          <form className='' onSubmit={onSubmit}>
            <input type='file' accept='img/*' id='input-file' style={{ display: 'none' }} onChange={onLoadFile} />
            <UploadLabel htmlFor='input-file'>파일 선택하기</UploadLabel>
            <HistoryButton bntColor={Colors.lightYellow} type='submit'>사진 수정</HistoryButton>
            <HistoryButton bntColor={Colors.gray} onClick={handleProfileClose}>취소</HistoryButton>
          </form>
        </ProfileImageWrapper>
      </ReviewView>
    </Backdrop>
  );
}

export default UserProfile;
