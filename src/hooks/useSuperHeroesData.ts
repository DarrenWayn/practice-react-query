import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchSuperHeores = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperhero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery("super-heroes", fetchSuperHeores, {
    onSuccess,
    onError,
    /* select: (data: any) => { */
    /*   const superHeroeNames = data.data.map((hero: any) => hero.name); */
    /*   return superHeroeNames; */
    /* }, */
  });
};

export const useAddSuperHeroData = () => {
  return useMutation(addSuperhero);
};

export default useSuperHeroesData;
