import styled from 'styled-components';
import { User } from '../features/usersSlice';
import { useGetRandomPhotosQuery } from '../features/photosSlice';
import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

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

const ImageDisplay = (props: userInfoProps) => {
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

  if (error) {
    if ('data' in error) {
      const errMsg = error.data as string;
      return (
        <span className="text-5xl my-auto self-center text-red-600 leading-16">
          Images can't be displayed. <br />
          Error: {errMsg}
        </span>
      );
    }
  } else {
    <div className="flex flex-row  flex-wrap">
      {!isFetching && photos
        ? photos.map(photo => {
            return <StyledImage className="mx-4" src={photo.urls.regular} />;
          })
        : new Array(10).fill(null).map((_, i) => {
            return (
              <div className="m-4" key={i}>
                <Skeleton variant="rounded" width={300} height={300} />
              </div>
            );
          })}
    </div>;
  }
};

export default ImageDisplay;
