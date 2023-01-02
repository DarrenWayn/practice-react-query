import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = (heroId: any) =>
  axios.get(`http://localhost:4000/superheroes/${heroId}`);

const useSuperHeroData = (heroId: any) => {
  // to set the initial data that have been cache
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId), {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero: any) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};

export default useSuperHeroData;
