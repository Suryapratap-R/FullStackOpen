import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
};

const updateById = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(baseUrl + "/" + id, newObject, config);
  return request.data;
};

const addLikes = async (id, likes) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.patch(baseUrl + "/" + id, {likes: likes+1}, config);
  return request.data;
};

const deleteWithId = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(baseUrl + "/" + id, config);
  return request.data;
};

const blogService = { getAll, createNew, setToken, updateById, deleteWithId, addLikes };

export default blogService;
