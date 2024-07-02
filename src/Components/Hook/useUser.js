import { useDispatch } from "react-redux";
import {userRegistrationLoading,
    userRegistrationSuccess,
    userRegistrationError,
    userLoginSuccess,
    userLoginLoading,
    userLoginError,
    userLogoutLoading,
    userLogoutSuccess,
    userLogoutError,
    getAllEmailsError,
    getAllEmailsSuccess,
    startGetAllEmailsLoading} from "../../Store/Slice/UserSlice";    
    import {registerUser} from "../../Service/user/registerUser";
    import { loginUser } from "../../Service/user/loginUser";
    import { logoutUser } from "../../Service/user/logoutUser";
import { getAllEmails } from "../../Service/user/getEmails";
import { createEmails } from "../../Service/user/createEmails";

    const useUser = () => {
        const dispatch = useDispatch();
        
        const handleRegisterUser = async (data) => {
            try {
                dispatch(userRegistrationLoading());                
                const res = await registerUser(data);                           
                dispatch(userRegistrationSuccess(res.data)); 
                return res;                                           
            } catch (error) {              
                dispatch(userRegistrationError(error));                
            }
        };
    
        const handleLoginUser = async (data) => {
            try {
              dispatch(userLoginLoading());
              const res = await loginUser(data);              
              dispatch(userLoginSuccess(res.data)); 
              return res;                                 
            } catch (error) {            
              dispatch(userLoginError(error));
            }
          };

          const handleLogoutUser = async () => {
            try {
              dispatch(userLogoutLoading());
              const res = await logoutUser();
              dispatch(userLogoutSuccess(res.data));                     
            } catch (error) {
              dispatch(userLogoutError(error));
            }
          };

          const handleGetAllEmails=async()=>{
            try{
              dispatch(startGetAllEmailsLoading());
              const res=await getAllEmails();
              dispatch(getAllEmailsSuccess(res.data));
            }catch(error){
              dispatch(getAllEmailsError(error));
            }
          };

          const handleCreateEmails=async(data)=>{
            try{
              const res=await createEmails(data);
              await handleGetAllEmails();
              return res.data;
            }catch(error){
              return error;
            }
          };
        return{
            handleRegisterUser,
            handleGetAllEmails,
            handleCreateEmails,
            handleLoginUser,
            handleLogoutUser
        };
    }
    export default useUser;