import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  passwordUpdateSuccess,
  updateSuccess,
  // usersSuccess
} from "../features/authSlice";
// import { logoutDataSuccess } from "../features/dataSlice";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();

  //* REGISTER FUNCTION
  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/admin/create`,
        userData
      );
      dispatch(registerSuccess(data));
      navigate("/dbmain/verification");
    } catch (error) {
      console.log("Error during registration:", error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message);
    }
  };

   //* DELETE ADMIN
   const deleteUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/control/admin/delete`, { data: { userId } }
      );
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };


    //* UPDATE ADMIN PROFILE
    const update = async (userData) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.put(
          `${process.env.REACT_APP_API_URL}/control/admin/update`,{ data:{userData}});
    
          dispatch(updateSuccess(data));
          toast.success("Profile updated successfully");
      } catch (error) {
        dispatch(fetchFail());
        toast.error(error);
      }
    };

//* VERIFICATION
    const verify = async (userId) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.put(
          `${process.env.REACT_APP_API_URL}/control/admin/verify/${userId}`);
    
          dispatch(updateSuccess(data));
          toast.success("Profile updated successfully");
      } catch (error) {
        dispatch(fetchFail());
        toast.error(error);
      }
    };

  //* LOGIN FUNCTION
  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/auth/login/`,
        userData
      );
      if (!data?.result?.verified) {
        deleteUser(data?.result?._id);
        toast.error("No such account found!");
      } else {
        dispatch(loginSuccess(data));
        toast.success("Welcome to the How To Sell!");
        navigate("/db");
      }
    } catch (error) {
      dispatch(fetchFail());
      toast.error("Invalid login. Please check your details and try again.");
    }
  };

  //* FORGOT PASSWORD (TO GET EMAIL)
  const forgotPassword = async (email) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/admin/forgotpass`,
        email
      );
      toast("Check your email to reset your password.");
    } catch (error) {
      console.log("Error during registration:", error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message);
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

 

  //! DELETE ACCOUNT
  // const deleteAccount = async (userId) => {
  //   dispatch(fetchStart());
  //   try {
  //     await axiosWithToken.delete(
  //       `${process.env.REACT_APP_API_URL}/users/${userId}`
  //     );
  //     logoutSuccess();
  //     toast.success("User successfully deleted.");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     toast.error("User delete failed!");
  //   }
  // };



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


  //! UPDATE PASSWORD
  const passwordUpdate = async (password) => {
    try {
      const res = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/users/updatepass`,
        password
      );
      dispatch(passwordUpdateSuccess(res));
      toast.success("Password Changed Successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error("Failed to change password");
    }
  };

    //! UPDATE FORGOTTEN PASSWORD
    const forgottenPasswordUpdate = async (password, userId) => {
      try {
        const res = await axiosWithToken.put(
          `${process.env.REACT_APP_BASE_URL}/users/updateforgottenpass/${userId}`,
          {password}
        );
        dispatch(passwordUpdateSuccess(res));
        navigate('/login')
        toast.success("Password Changed Successfully");
      } catch (error) {
        dispatch(fetchFail());
        toast.error("Failed to change password");
      }
    };

  //! LOGOUT FUNCTION
  const logout = async () => {
    dispatch(fetchStart());
    try {
      localStorage.clear();
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout/`);
      dispatch(logoutSuccess());
      // dispatch(logoutDataSuccess());
      toast.success("Logout successfull");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };


  return {
    login,
    register,
    createNewUser,
    logout,
    forgotPassword,
    deleteUser,
    update,
    listUsers,
    passwordUpdate,
    updateUser,
    forgottenPasswordUpdate,
    verify
  };
};

export default useAuthCall;
