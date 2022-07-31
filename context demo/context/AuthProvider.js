import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
//import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //const router = useRouter();
  const [user, setUser] = useState({});
  const [IsAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const dummy = "dummy";
  const headers = {
    "Content-Type": "application/json",
  };

  //verify on refresh
  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      console.log("yooo");
      try {
        const result = await axios.post(
          "/api/auth/verify",
          "",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        // const id = result.data.id;
        // const email = result.data.email;
        // const name = result.data.name;
        // const role = result.data.role;
         setUser({ id: id, email: email, name: name, role: role });
         if (result.data.role === "admin") setIsAdmin(true);
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    verifyCookie();
  }, []);

  //login
  const logIn = async (user) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/login",
        user,
        {
          headers: headers,
        },
        { withCredentials: true }
      );
      // const id = result.data.id;
      // const email = result.data.email;
      // const name = result.data.name;
      // const role = result.data.role;
       setUser({ id: id, email: email, name: name, role: role });
       if (result.data.role == "admin") setIsAdmin(true);
      setLoading(false);
      
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //logout
  const logout = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/logout");
      setUser({});
      setIsAdmin(false);
      setLoading(false);
     // router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        dummy,
        logIn,
        loading,
        IsAdmin,
        setIsAdmin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
