import AxiosService from "./axios";

export const GetExample = (number, number1) => {
    const url = `/API?number=${number}&number1=${number1}`;
    return AxiosService.get(url);
};