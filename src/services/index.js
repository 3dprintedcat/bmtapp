import { AxiosLocal,AxiosService, AxiosServiceLive } from "./axios";

export const GetSystems = () => {
    const url = `starmap/systems`;
    return AxiosService.get(url);
};
export const GetUser = (userHandle) => {
    const url = `user/${userHandle}`;
    return AxiosServiceLive.get(url);
};
export const GetBodies = (system) => {
    const url = `starmap/star-system?code=${system}`;
    return AxiosService.get(url);
};
export const GetItemList = () => {
    const url = `items/`;
    return AxiosLocal.get(url);
};
export const DeleteItemList = (id) => {
    const url = `items/?id=${id}`;
    return AxiosLocal.delete(url);
};