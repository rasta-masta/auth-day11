import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Beranda } from "./pages/beranda";
import { Welcome } from "./pages/welcome";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./redux/userSlice";
import { Required } from "./components/required";

const router = createBrowserRouter([
   { path: "/", element: <Welcome /> },
   {
      element: <Required />,
      children: [{ path: "/beranda", element: <Beranda /> }],
   },
]);

function App() {
   const token = localStorage.getItem("token");
  //  console.log(token);
   const dispatch = useDispatch();

   const keepLogin = async () => {
      try {
         const response = await axios.get(`http://localhost:2000/users/keeplogin`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
        //  console.log(response.data);
         dispatch(setData(response.data.result));
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      keepLogin(); 
   }, [dispatch]);

   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
