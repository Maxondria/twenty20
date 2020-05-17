import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const FETCH_CONTRIBUTIONS = gql`
  {
    getContributions {
      id
      message
      amount
      updatedAt
      createdAt
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(FETCH_CONTRIBUTIONS);
  console.log(data, loading, error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getContributions.map(({ id, amount, message }) => (
    <div key={id}>
      <p>{amount}</p>
    </div>
  ));
};

export default App;
