import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import { getAdminsSuccess } from "../features/dataSlice";
import {
    fetchStart,
    fetchFail} from "../features/dataSlice"

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();


    //! LIST ADMINS
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


      
    


  //! UPDATE ADMIN PROFILE
  const update = async (userData, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/update/${userId}`,
        userData
      );

    //   dispatch(updateSuccess(data));

      console.log("res data", data);

      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
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
      listUsers();
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
      listUsers();
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error("This email is already taken");
    }
  };

  //! LIST USERS
  const listUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_API_URL}/users/`
      );
      // dispatch(usersSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    createNewUser,
    update,
    listUsers,
    updateUser,
    listAdmins,
  };
};

export default useAuthCall;
