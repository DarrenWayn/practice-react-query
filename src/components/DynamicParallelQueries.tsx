import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId: number) =>
  axios.get(`http://localhost:4000/superheroes/${heroId}`);

const DynamicParallelQueries = ({ heroIds }: any) => {
  const queryResults = useQueries(
    heroIds.map((id: number) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log(queryResults);
  return <div>ParallelQueriesPage</div>;
};

export default DynamicParallelQueries;
