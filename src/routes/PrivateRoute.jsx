import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
