import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../core/config.mjs";
import { setGoogleToken } from "../../utils/localStorage.mjs";
import { useAuth } from "../../contexts/authentication";
import { jwtDecode } from "jwt-decode";

const LoginGoogle = () => {
  const navigate = useNavigate();

  const {state,setState} = useAuth()

  useEffect(() => {
    const initClient = () => {
      gapi.client.init = {
        clientId: GOOGLE_CLIENT_ID,
        scope: "",
      };
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onGoogleSuccess = (res) => {
    const token = res.tokenId;
    setGoogleToken(token);
    setState({...state, user:jwtDecode(token)})
    navigate("/");
  };

  const onGoogleFailure = (res) => {
    console.log("Google login failed:", res);
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={onGoogleSuccess}
      onFailure={onGoogleFailure}
      cookiePolicy={"single_host_origin"}
      className="!text-[16px] !px-[24px] !py-[2px] !rounded-full !font-bold"
    >
      Google
    </GoogleLogin>
  );
};

export default LoginGoogle;
