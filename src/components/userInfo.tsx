import styled from 'styled-components';
import { User } from '../features/usersSlice';
import { useGetRandomPhotosQuery } from '../features/photosSlice';
import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';

interface userInfoProps {
  selectedUser: User;
}

const StyledImage = styled.img`
  object-fit: cover;
  margin: 2rem;
  border-radius: 10px;
  height: 300px;
  width: 300px;
  box-shadow: 6px 10px 10px 6px rgba(0, 0, 0, 0.2);
`;

const StyledUserInfoWrapper = styled.div`
  background-color: #fffdfd;
  padding-left: 380px;
  width: 100%;
  display: flex;
`;

const UserInfo = (props: userInfoProps) => {
  const { selectedUser } = props;
  const {
    data: photos,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetRandomPhotosQuery();
  console.log(error, isError, refetch);
  const triggerRefetchWithDelay = () => {
    setTimeout(() => {
      refetch(); // Call refetch after the delay
    }, 10000); // Replace 2000 with your desired delay in milliseconds
  };
  useEffect(() => {
    triggerRefetchWithDelay();
  }, []);
  useEffect(() => {
    refetch();
  }, [selectedUser]);

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
      {!isError && !error ? (
        <div className="flex flex-row  flex-wrap">
          {!isFetching && photos
            ? photos.map(photo => {
                return (
                  <StyledImage className="mx-4" src={photo.urls.regular} />
                );
              })
            : new Array(10).fill(null).map((_, i) => {
                return (
                  <div className="m-4" key={i}>
                    <Skeleton variant="rounded" width={300} height={300} />
                  </div>
                );
              })}
        </div>
      ) : (
        <span className="text-5xl my-auto self-center text-red-600 leading-16">
          Images can't be displayed. <br />
          Error: {error.data}
        </span>
      )}
    </StyledUserInfoWrapper>
  );
};

export default UserInfo;
