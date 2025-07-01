import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";
import "./login.css";
import {toast} from "react-toastify";
import { ColorModeButton } from "./ui/color-mode";
 

const Login = () => {

    const [id,setId] = useState("");
    const [pass,setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(!loading);

      if(!id){
        toast.error("Fill Email");
        setLoading(false);
        return;
      }
      if(!pass){
        toast.error("Fill Password");
        setLoading(false);
        return;
      }

        const response = await fetch(`http://localhost:5000/admin`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, pass})
        })

        const resp = await response.json();
        if(!response.ok){
          toast.error(resp.message);
          setLoading(false);
          return;
        }
        toast.success(resp.message);
        navigate("/data");
    }



    return (<>
          <div className="theme" style={{margin:"1%",display:"flex",justifyContent:"flex-end"}}><ColorModeButton/></div>
    <div className="outer">
      <div className="login-container">
        <h2 style={{fontWeight:"bold",fontSize:"xx-larger"}}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <Input className="idinput" value={id.trim()}
              onChange={(e) => setId(e.target.value)}/>

          </div>
          <div className="form-group">
            <label>Password:</label>
            <PasswordInput className="idinput" value={pass.trim()} onChange={(e) => setPass(e.target.value)}/>
          </div>
          <Button loading={loading} type="submit" className="loginbtn">Login</Button>
          <br />
          <Link href="/forgotpassword" className="fplnk">Forgot Password?</Link>
          
        </form>
      </div>
      
      </div>
    
    
    </>)

}

export default Login;