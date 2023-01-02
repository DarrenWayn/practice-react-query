import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, {
  useAddSuperHeroData,
  useDeleteSuperHeroData,
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

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
    setName("");
    setAlterEgo("");
  };

  const { mutate: deleteHero } = useDeleteSuperHeroData();

  const handleDeleteHeroClick = (heroId: any) => {
    deleteHero(heroId);
  };

  if (isLoading) return <div>Loading ....</div>;
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
            <button onClick={handleDeleteHeroClick.bind(this, hero.id)}>
              Delete super hero
            </button>
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
