import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/auth_content.component";
import LoadingOverlay from "../components/ui/loading_overlay.component";
import { AuthContext } from "../store/auth.context";
import { createUser } from "../utils/auth.util";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not sign you up, Please check your input or try again later!"
      );

      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
