import api from "../api/axios";

const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/task/delete/${id}`);
    return response.data.sucess || false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default deleteTask;
