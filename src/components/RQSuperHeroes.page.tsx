import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, {
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

const RQSuperHeores = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data: any) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error: any) => {
    console.log("Perform side effect after ecountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroData();
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
    setName("");
    setAlterEgo("");
  };

  if (isLoading || isFetching) return <div>Loading ....</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <React.Fragment>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch as any}>Fetch Heroes</button>
      {data?.data.map((hero: any) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName: any) => { */}
      {/*   return <div key={heroName}>{heroName}</div>; */}
      {/* })} */}
    </React.Fragment>
  );
};
export default RQSuperHeores;
