import { DogAPI_RandomImageResponse } from "../types";
import useGetData from "./useGetData";

const useRandomDogImage = () => {
  return useGetData<DogAPI_RandomImageResponse>(
    "https://dog.ceo/api/breeds/image/random"
  );
};

export default useRandomDogImage;
