import React, { useContext } from "react";
import { Button, notification } from "antd";
import { AuthUserContext } from "../../contexts/User";

const HomePage = () => {
  const { client, setUser } = useContext(AuthUserContext);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    client.resetStore();
    notification.info({
      message: "Goodbye",
      key: "auth-toast",
    });
  };

  return (
    <div>
      <p>HomePage</p>
      <Button type="primary" danger onClick={logout}>
        Log out
      </Button>
    </div>
  );
};

export default HomePage;
