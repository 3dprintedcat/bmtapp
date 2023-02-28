import Axios  from "axios";
import { GetRootURL } from "../config/Config";

const AxiosService = Axios.create({
    baseURL: GetRootURL(),
});

export default AxiosService;