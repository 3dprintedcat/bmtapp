import Axios  from "axios";
import { GetLiveRootURL, GetLocal, GetRootURL } from "../config/Config";

export const AxiosService = Axios.create({
    baseURL: GetRootURL(),
});
export const AxiosServiceLive = Axios.create({
    baseURL: GetLiveRootURL(),
});
export const AxiosLocal = Axios.create({
    baseURL: GetLocal(),
});