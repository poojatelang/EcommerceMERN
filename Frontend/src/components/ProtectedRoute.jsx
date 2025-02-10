import { useNavigate } from "react-router-dom";

const decodeJWT = (token) => {
  if (!token) return null;

  const base64Url = token.split(".")[1]; // Extract the payload part of the token
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return navigate("/register");
  }

  const decodedToken = decodeJWT(token);
  console.log(decodedToken);
  if (!decodedToken || decodedToken.role !== "admin") {
    return navigate("./homepage");
  }

  return children;
};

export default ProtectedRoute;
