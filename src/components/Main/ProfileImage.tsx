// 소개글 구역에 사용할 프로필 이미지
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

export interface ProfileImageProps {
  profileImage: FluidObject;
}

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  profileImage,
}: any) => {
  return <ProfileImageWrapper image={profileImage} />;
};

export default ProfileImage;
