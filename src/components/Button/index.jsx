// prop types
import PropTypes from "prop-types";

const Button = ({ children, className, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-3 text-sm font-bold tracking-wider outline-none transition-all duration-150 active:scale-95 md:px-5 md:text-base ${className ? className : ""}`}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
