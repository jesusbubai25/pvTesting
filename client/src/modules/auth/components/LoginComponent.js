import React, { useEffect, useState } from "react";
import "./Login.css";
import Buttons from "../../../components/ButtonsComp";
import { useNavigate } from "react-router-dom";
import PageURL from "../../../constants/PageURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userLogin } from "../../../actions/userActions";
import { clear_errors, user_login_reset } from "../../../constants/dataConstants";
import Loader from "../../../components/Loader";

const LoginComponent = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", password: "" });
  const dispatch = useDispatch();
  const [openEye, setopenEye] = useState(false)
  const [text, setText] = useState(true)
  const { user, error, loading, isLogin } = useSelector(state => state.user)

  const handleLogin = async () => {

    if (form.userName.trim() === "" || form.password.trim() === "") {
      toast.error("Enter a valid userName and password")
      return;
    }
    else if (!form.userName.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      toast.error("Enter a valid username")
      return;
    } else {
      dispatch(userLogin(form))
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: clear_errors })
    }
    if (isLogin) {
      toast.success("Logged In Successfully!")
      dispatch(getUser())
      dispatch({ type: user_login_reset })
      navigate(PageURL.COUNTRYDEFAULT);
    }

  }, [error, navigate, dispatch, isLogin])


  return (
    <div className="login-box">
      {
        loading && <Loader />
      }
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <div className="inputs">
        <input
          type="text"
          placeholder="Username"
          style={{
            width: "20vw",
            height: "7vh",
            textAlign: "center",
            fontWeight: "bolder",
            borderColor: "#ED7D31",
            borderStyle: "solid",
            borderWidth: "3px",
            color: "black",
          }}
          value={form?.userName}
          onChange={(e) => {
            setForm({ ...form, userName: e.target.value });
          }}
        />
      </div>
      <div className="inputs">
        <input
          type={text ? "password" : "text"}
          placeholder="Password"
          style={{
            width: "20vw",
            height: "7vh",
            textAlign: "center",
            fontWeight: "bolder",
            borderStyle: "solid",
            borderColor: "#ED7D31",
            borderWidth: "3px",
          }}
          value={form?.password}
          onChange={(e) => {
            setopenEye(true)
            setForm({ ...form, password: e.target.value });
          }}
        />
        <div style={{ position: "relative" }}>
          <i onClick={() => setText(!text)} style={{
            display: openEye ? "block" : "none", position: "absolute", right: "20%", bottom: "19px",
            color: "black"
          }}
            class={`fa-solid ${!text ? "fa-eye" : "fa-eye-slash"}`}></i>
        </div>

        {/* <span  style={{ position: "relative", left: "76%", bottom: "35px", height: "12px", width: "23px", borderRadius: "50%", backgroundColor: "black",
         display:openEye? "flex":"none", alignItems: "center", justifyContent: "center" }}>
          <span style={{ height: "5px", width: "6px", border: "2px solid white", borderRadius: "50%", backgroundColor: "black" }}>
            </span> 
            <span style={{display:text?"block":"none", position:"absolute",width:"1px",height:"145%",backgroundColor:"black",borderLeft:"2px solid white",transform:"rotateY(0deg) rotate(-45deg)"}}></span>
            </span> */}
      </div>

      <div className="buttons">
        <Buttons
          type="contained"
          buttonType="primary"
          buttonText="Login"
          onClick={() => {
            handleLogin();
          }}
        ></Buttons>
        <Buttons
          type="outlined"
          buttonType="secondary"
          buttonText="Reset"
          onClick={() => {
            setForm({ userName: "", password: "" });
          }}
        ></Buttons>
        <p onClick={() => {
          navigate(PageURL.FORGOT_PASSWORD)
          // props.setisForgotPassword(true);
          // props.setIsLoginSelected(false)

        }} className="forgot_password">Forgot Password</p>
      </div>
    </div>

  );
};

export default LoginComponent;
