import React, { useEffect } from "react";
import "./CountryHeader.css";
import GreenLogo from "../../../newLogo.PNG";

import Buttons from "../../../components/ButtonsComp";
import { useLocation, useNavigate } from "react-router-dom";
import PageURL from "../../../constants/PageURL";
import DropDown from "../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";

const CountryHeader = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLogout } = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(userLogout())
  }
  useEffect(() => {
    if (isLogout) {
      toast.success("User Logged out sucessfully!")
      dispatch({ type: 'USER_LOGOUT' })
      navigate(PageURL.BASE)
    }

  }, [dispatch, navigate, user, props, isLogout])


  return (
    <div className="header"  style={{justifyContent:"space-between",paddingLeft:"1.5rem"}}>
      <div className="logo">
        <img onClick={() => navigate(PageURL.COUNTRYDEFAULT)}
          src={GreenLogo}
          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          alt="Greenenco-Logo"
        />
      </div>
      <div className="title" style={{width:"80vw"}}>
        <h3 style={{ color: "#ed7d31", fontSize: "140%" }}>
          Creating Climate To Live In A Better World
        </h3>
        {/* <div className="dropdown">
          <DropDown />
        </div> */}
        <div style={{display:"flex",alignItems:"center"}}>

          <div>
            <Buttons
              type="contained"
              buttonType="primary"
              buttonText="Project Details"
              onClick={() => {
                navigate(PageURL.PROJECT_DETAILS)
                // props?.setDashBoard(true);
              }}
            ></Buttons>
          </div>
          {PageURL.COUNTRYDEFAULT === location.pathname && user && user.LevelPermission === 4 && (
            <div>
              <Buttons

                type="contained"
                buttonType="primary"
                buttonText="Admin Dashboard"
                onClick={() => {
                  props?.setDashBoard(true);
                }}

              ></Buttons>
            </div>
          )}

          <div className="logout">
            <Buttons
              type="contained"
              buttonType="primary"
              buttonText="Logout"
              onClick={logoutHandler}
            ></Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryHeader;
