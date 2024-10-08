// prop types
import PropTypes from "prop-types";

const Modal = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${className ? className : ""} bg-modal fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center`}
    >
      {children}
    </div>
  );
};

// Props validation
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
