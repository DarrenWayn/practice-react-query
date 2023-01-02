import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");
const fetchFriends = () => axios.get("http://localhost:4000/friends");

const ParallelQueriesPage = () => {
  const {data: superHeroes} =  useQuery("super-heroes", fetchSuperHeroes);
  const {data: friends } = useQuery("friends", fetchFriends);

  return <div>ParallelQueriesPage</div>;
};

export default ParallelQueriesPage;
