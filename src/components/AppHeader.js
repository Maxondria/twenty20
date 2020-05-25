import React from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Avatar } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { FormattedDate, FormattedTime, FormattedMessage } from "react-intl";

const notifications = [
  {
    id: 1,
    createdAt: Date.now(),
    message:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    createdAt: Date.now(),
    message:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    createdAt: Date.now(),
    message:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 4,
    createdAt: Date.now(),
    message:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 5,
    createdAt: Date.now(),
    message:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

const AppHeaderStyled = styled.div`
  height: 65px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const NotificationCard = styled.div`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(18, 38, 63, 0.1);
  border-radius: 0.375rem;
  width: 350px;
  height: 412px;
`;

const NotificationCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: transparent;
  border-bottom: 1px solid #edf2f9;
  font-size: 13px;

  & > span {
    font-weight: 600;
  }
`;

const NotificationCardBody = styled.div`
  overflow: auto;
  height: calc(412px - 53px);
`;

const Notifications = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem 1.5rem;

  .info {
    font-size: 13px;
    flex: 1;

    & > p {
      margin: 0;
      margin-bottom: 0.2rem;
    }

    & > span {
      color: #95aac9;
      font-size: 12px;
    }
  }
`;

const DropDownCard = styled.div`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(18, 38, 63, 0.1);
  border-radius: 0.375rem;
`;

const GreyLink = styled(NavLink)`
  padding: 8px 18px;
  display: block;
  color: #6e8483;
  transition: 0.5s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
const UserBox = styled.div`
  padding: 8px 18px;
  background-color: #1890ff;
  color: white;
  p {
    margin: 0 0 -5px 0;
  }
  span {
    font-size: 10px;
    font-weight: 300;
  }
`;

const AppHeader = ({ user }) => {
  const params = useParams();

  return (
    <AppHeaderStyled>
      <div></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "18px", cursor: "pointer" }}>
          <Dropdown
            overlay={
              <NotificationCard>
                <NotificationCardHeader>
                  <span>
                    <FormattedMessage
                      defaultMessage="Notifications"
                      id="app.text.notifications"
                    />
                  </span>
                  <NavLink to="/notifications">
                    <FormattedMessage
                      defaultMessage="View all"
                      id="app.text.viewall"
                    />
                  </NavLink>
                </NotificationCardHeader>
                <NotificationCardBody>
                  <Scrollbars style={{ padding: "1rem" }} autoHide>
                    {notifications.map((notif) => (
                      <Notifications key={notif.id}>
                        <Avatar size={40} style={{ marginRight: "15px" }} />
                        <div className="info">
                          <p>{notif.message}</p>
                          <span>
                            <FormattedDate
                              value={notif.createdAt}
                              year="numeric"
                              month="long"
                              day="2-digit"
                            />
                            {" - "}
                            <FormattedTime value={notif.createdAt} />
                          </span>
                        </div>
                      </Notifications>
                    ))}
                  </Scrollbars>
                </NotificationCardBody>
              </NotificationCard>
            }
          >
            <Badge dot>
              <NotificationOutlined />
            </Badge>
          </Dropdown>
        </div>
        <Dropdown
          trigger={["click"]}
          overlay={
            <DropDownCard>
              <div style={{ width: "160px", padding: "0 0 8px 0" }}>
                <UserBox>
                  <p>
                    {user?.firstname} {user?.lastname}
                  </p>
                  <span>{user?.email}</span>
                </UserBox>
                <GreyLink to={`/${params.lang}/settings/profile`}>
                  <FormattedMessage
                    defaultMessage="Profile"
                    id="app.text.Profile"
                  />
                </GreyLink>
                <GreyLink to={`/${params.lang}/settings`}>
                  <FormattedMessage
                    defaultMessage="Settings"
                    id="app.text.Settings"
                  />
                </GreyLink>
              </div>
            </DropDownCard>
          }
        >
          <Avatar
            style={{ cursor: "pointer" }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </AppHeaderStyled>
  );
};

export default AppHeader;
