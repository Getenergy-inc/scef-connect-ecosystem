import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Legacy /auth route — redirects to the new sign-in page.
const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth/sign-in", { replace: true });
  }, [navigate]);
  return null;
};

export default Auth;
