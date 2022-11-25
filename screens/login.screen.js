import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/auth_content.component";
import LoadingOverlay from "../components/ui/loading_overlay.component";
import { AuthContext } from "../store/auth.context";
import { login } from "../utils/auth.util";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in, Please check your credentials or try again later!"
      );
      
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in" />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
