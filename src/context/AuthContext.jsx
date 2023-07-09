import { createContext, useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/LoginApi";
import { SignupUser } from "../apiCalls/SignupApi";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider =({ children })=>{

    const navigate = useNavigate();

    const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
    const [token, setToken] = useState(localStorageToken?.token);
    const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

    const loginHandler = async({ email,password })=>{
        try{
            const res = await LoginUser(email,password)

            const { status, data:{ foundUser,encodedToken }} = res;
            console.log(res)
            if( status === 200 ){
                localStorage.setItem(
                    "loginDetails",
                    JSON.stringify({ user: foundUser, token: encodedToken })
                  );
                  setCurrentUser(foundUser);
                  setToken(encodedToken);
                  toast.success("Successfully logged in!");
                  navigate("/");
                }
            }
            catch(e){
            console.error(e)
            toast.error("Unable to login!")
        }
    }
    
    const signUpHandler =async({ email,password,firstName,lastName })=>{
        try{
            const res = await SignupUser(
                email,
                password,
                firstName,
                lastName
                )
                
                const { status, data:{ createdUser, encodedToken }} = res;
                if(status === 201){
                    localStorage.setItem(
                        "loginDetails",
                        JSON.stringify({ user: createdUser, token: encodedToken })
                        );
                        setToken(encodedToken);
                        setCurrentUser(createdUser);
                        toast.success("Successfully signed up!");
                        navigate("/");
            }
        }
        catch(e){
            console.error(e)
            toast.error("Unable to signup!")
        }
    }

    const logoutHandler = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem("loginDetails");
        toast.success("Logged Out!")
        navigate("/");
      };


    return(
        <AuthContext.Provider value={{ 
            token,
            currentUser,
            loginHandler,
            signUpHandler,
            logoutHandler,
        }}>
            { children }
        </AuthContext.Provider>
    )
} 

export const useAuth =()=> useContext(AuthContext);