import Axios  from "axios";
import { GetLocal, GetRootURL } from "../config/Config";

export const AxiosService = Axios.create({
    baseURL: GetRootURL(),
});
export const AxiosLocal = Axios.create({
    baseURL: GetLocal(),
});