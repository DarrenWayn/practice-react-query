import axios from "axios";
import React, { useState, useEffect } from "react";

const SuperHeroes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) return <h2>{error}</h2>;

  return (
    <React.Fragment>
      <h2>Super Heroes Page</h2>
      {data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </React.Fragment>
  );
};
export default SuperHeroes;
