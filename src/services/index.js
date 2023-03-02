import AxiosService from "./axios";

export const GetSystems = () => {
    const url = `starmap/systems`;
    return AxiosService.get(url);
};

export const GetBodies = (system) => {
    const url = `starmap/star-system?code=${system}`;
    return AxiosService.get(url);
};