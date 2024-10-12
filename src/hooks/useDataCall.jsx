import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getClientsSuccess,
  getAdminsSuccess,
} from "../features/dataSlice";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();

  //* LIST ADMINS
  const listAdmins = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_API_URL}/control/admin/list`
      );

      dispatch(getAdminsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //* UPDATE ADMIN PROFILE
  const updateAdmin = async (userData, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/update/${userId}`,
        userData
      );
      listAdmins();
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };

  //! LIST USERS
  const listClients = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_API_URL}/user/list`
      );
      console.log("client data", data);
      dispatch(getClientsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //! CREAT A NEW ADMIN
  const createNewUser = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_API_URL}/users/createuser/`,
        userData
      );
      listClients();
    } catch (error) {
      console.log("Error during registration:", error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message);
    }
  };

  //! UPDATE A MEMBER
  const updateUser = async (userId, updateData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        updateData
      );
      listClients();
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error("This email is already taken");
    }
  };

  return {
    createNewUser,
    updateAdmin,
    listClients,
    updateUser,
    listAdmins,
  };
};

export default useAuthCall;
