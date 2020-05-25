import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Modal } from "antd";
import styled from "styled-components";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useIntl } from "react-intl";
import NoMatch from "../pages/NoMatch";
import Home from "../pages/Settings/Home";
import Profile from "../pages/Settings/Profile";
import ChangePassword from "../pages/Settings/ChangePassword";
import { messages } from "../utils/commonwords";
import { AuthUserContext } from "../contexts/User";

const SettingsPage = styled.div`
  min-height: inherit;
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const SettingsCard = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: white;
  display: flex;
  max-width: 935px;
  overflow: hidden;
  width: 100%;
`;

const SettingsCardSidebar = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  background-color: #fafbfd;

  a {
    border-left: 2px solid transparent;
    display: block;
    min-width: 200px;
    padding: 10px 15px;
    transition: 0.5s ease;
    color: #6e8483;
  }

  .activeClass {
    border-left: 2px solid #1890ff;
    font-weight: 600;
  }

  span {
    border-left: 2px solid transparent;
    display: block;
    min-width: 200px;
    padding: 10px 15px;
    transition: 0.5s ease;
    color: red;
    cursor: pointer;
  }
`;

const SettingsCardMain = styled.div`
  flex: 1;
  padding: 35px 30px;
`;

const Settings = () => {
  const { authUser, logout } = useContext(AuthUserContext);
  const match = useRouteMatch();
  const intl = useIntl();

  const links = [
    { name: "Account Settings", to: `${match.url}` },
    { name: "Edit Profile", to: `${match.url}/profile` },
    { name: "Change Password", to: `${match.url}/passwordchange` },
  ];

  return (
    <SettingsPage>
      <SettingsCard>
        <SettingsCardSidebar>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink exact activeClassName="activeClass" to={link.to}>
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <span
              onClick={() => {
                Modal.confirm({
                  title: `${authUser.firstname} ${authUser.lastname}`,
                  content: intl.formatMessage(messages.Areusure),
                  onOk() {
                    logout();
                  },
                  okText: intl.formatMessage(messages.logout),
                  okButtonProps: { type: "primary", danger: true },
                  cancelText: intl.formatMessage(messages.cancel),
                  onCancel() {},
                });
              }}
            >
              {intl.formatMessage(messages.logout)}
            </span>
          </li>
        </SettingsCardSidebar>
        <SettingsCardMain>
          <Switch>
            <Route exact path="/:lang/settings">
              <Home />
            </Route>
            <Route path="/:lang/settings/profile">
              <Profile user={authUser} />
            </Route>
            <Route path="/:lang/settings/passwordchange">
              <ChangePassword />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </SettingsCardMain>
      </SettingsCard>
    </SettingsPage>
  );
};

export default Settings;
