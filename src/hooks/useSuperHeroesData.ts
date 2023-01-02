import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeores = () => {
  try {
    /* return axios.get("http://localhost:4000/superheroes"); */
    return request({ url: "/superheroes", method: "get" });
  } catch (err) {
    throw err;
  }
};

const addSuperHero = (hero: any) => {
  try {
    /* return axios.post("http://localhost:4000/superheroes", hero); */
    return request({ url: "/superheroes", method: "post", data: hero });
  } catch (err) {
    throw err;
  }
};

const deleteSuperHero = (heroId: any) => {
  try {
    /* return axios.delete(`http://localhost:4000/superheroes/${heroId}`); */
    return request({ url: "superheroes", method: "delete", data: heroId });
  } catch (err) {
    throw err;
  }
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
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    /* onSuccess: (data: any) => { */
    // to refetch super heroes query
    /* queryClient.invalidateQueries("super-heroes"); */
    /* queryClient.setQueryData("super-heroes", (oldQueryData: any) => { */
    /*   return { */
    /*     ...oldQueryData, */
    // oldQueryData.data is from data array
    //data.data mearns append from the mutation response
    /*       data: [...oldQueryData.data, data.data], */
    /*     }; */
    /*   }); */
    /* }, */
    onMutate: async (newHero: any) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context?.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};

export const useDeleteSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSuperHero, {
    onMutate: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};

export default useSuperHeroesData;
