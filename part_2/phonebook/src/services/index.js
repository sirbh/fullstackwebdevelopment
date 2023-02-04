import axios from "axios";

const baseurl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseurl);
};

const addPerson = (person) => {
  return axios.post(baseurl, person);
};

export default { getAll, addPerson };
