import axios from "../axios/axios";

const getAllFlightsService = () => {
    return axios.get('https://mocki.io/v1/ff3207e0-f250-4a1d-9240-b3dbffa8386a')
}

export {
    getAllFlightsService
}