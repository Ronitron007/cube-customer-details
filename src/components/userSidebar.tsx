import styled from 'styled-components';
import { User } from '../features/usersSlice';
import { useState } from 'react';
import classNames from 'classnames';

interface SideBarProps {
  Users: User[];
  setActiveUser: (user: User) => void;
}

const StyledSideBarWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 350px;
  border-right: 1px solid #dddddd;
  overflow-y: auto;
  height: 100vh;
`;

const StyledUserSection = styled.div`
  height: 160px;
  background-color: #ededed;
  border-bottom: 1px solid #000000;
  padding: 2rem;
  transition: all 0.2s ease-in-out;
  img {
    background-color: #000000;
  }
  &.active {
    color: #fff;
    background-color: #212121;
    border-right: 8px solid #232323;
    img {
      background-color: #fff;
    }
  }
`;

function SideBar(props: SideBarProps) {
  const { Users, setActiveUser } = props;
  const [activeId, setActiveId] = useState(Users[0].id);
  const sectionClickHandler = (user: User) => {
    const element = document.getElementById(`sidebar-${user.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    setActiveId(user.id);
    setActiveUser(user);
  };
  return (
    <>
      <StyledSideBarWrapper className="flex flex-col ">
        {Users.map(user => {
          return (
            <StyledUserSection
              className={classNames('flex flex-row', {
                active: activeId === user.id,
              })}
              key={user.id}
              id={`sidebar-${user.id}`}
              onClick={() => sectionClickHandler(user)}
            >
              <img className="h-2/3 mr-4 rounded-full" src={user.image} />
              <span className="self-baseline pt-2 text-xl font-bold">
                {user.firstName}
              </span>
            </StyledUserSection>
          );
        })}
      </StyledSideBarWrapper>
    </>
  );
}

export default SideBar;
