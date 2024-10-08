// hook
import { useRecoilValue } from "recoil";
// react router dom
import { Navigate } from "react-router-dom";
// atom
import { isAdminState } from "src/recoil";
// props validation
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // if admin login => can go
  const isAdmin = useRecoilValue(isAdminState);

  return isAdmin ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
