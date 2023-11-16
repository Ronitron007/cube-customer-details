import styled from 'styled-components';
import { User } from '../features/usersSlice';
import _ from 'lodash';
import ImageDisplay from './imgComponent';

interface userInfoProps {
  selectedUser: User;
}

const StyledUserInfoWrapper = styled.div`
  background-color: #fffdfd;
  padding-left: 380px;
  width: 100%;
  display: flex;
`;

const UserInfo = (props: userInfoProps) => {
  const { selectedUser } = props;

  return (
    <StyledUserInfoWrapper className="h-full w-1/1 flex-col">
      <div className="flex h-fit flex-col mx-auto mt-8">
        <img
          className=" w-1/3 mr-4 self-center rounded-full bg-black"
          src={selectedUser.image}
        />
        <span className="self-centre pt-6 text-xl self-center font-bold">
          {selectedUser.firstName +
            ' ' +
            selectedUser.maidenName +
            ' ' +
            selectedUser.lastName}
        </span>
      </div>
      <ImageDisplay selectedUser={selectedUser} />{' '}
    </StyledUserInfoWrapper>
  );
};

export default UserInfo;
