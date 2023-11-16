import { useEffect, useState } from 'react';
import './App.css';
import SideBar from './components/userSidebar';
import { User, useGetUsersQuery } from './features/usersSlice';
import UserInfo from './components/userInfo';
import _ from 'lodash';
import { Skeleton } from '@mui/material';

function App() {
  const { data: UsersData, isLoading } = useGetUsersQuery();
  const [activeUser, setActiveUser] = useState<User | undefined>();
  useEffect(() => {
    if (_.isUndefined(activeUser) && UsersData) {
      activeUserHandler(UsersData.users[0]);
    }
  }, [UsersData]);

  const activeUserHandler = (user: User) => {
    if (user) setActiveUser(user);
    else setActiveUser(undefined);
  };

  return (
    <>
      {!isLoading ? (
        <div style={{ width: '100vw', height: '100vh' }}>
          {UsersData ? (
            <SideBar
              setActiveUser={activeUserHandler}
              Users={UsersData.users}
            ></SideBar>
          ) : null}
          {activeUser ? <UserInfo selectedUser={activeUser}></UserInfo> : null}
        </div>
      ) : (
        <Skeleton variant="rectangular" width={1000} height={1000}></Skeleton>
      )}
    </>
  );
}

export default App;
