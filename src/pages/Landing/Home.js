import React, { useContext } from "react";
import { Button, toaster } from "evergreen-ui";
import { AuthUserContext } from "../../contexts/User";

const HomePage = () => {
  const { client, setUser } = useContext(AuthUserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    client.resetStore();
    toaster.notify("Goodbye", {
      id: "auth-toast",
    });
  };

  return (
    <div>
      <p>HomePage</p>
      <Button
        marginRight={16}
        onClick={logout}
        appearance="primary"
        intent="danger"
      >
        Log out
      </Button>
    </div>
  );
};

export default HomePage;
