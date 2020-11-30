import axios from "axios";

const hostName = window.location.hostname.split(".")[0];
const currentEnvironment = hostName === "localhost" ? "local" : "remote";
const environmentUrl =
  currentEnvironment === "remote"
    ? "http://20.73.32.126/"
    : "https://localhost:44341/";

const instance = axios.create({
  baseURL: environmentUrl,
});

const api = {
  getData: (id: number) =>
    instance.get(`/questions/${id}`).then(
      (response) => {
        if (response.data) {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    ),
  // postData: () => ....
};

export default api;
