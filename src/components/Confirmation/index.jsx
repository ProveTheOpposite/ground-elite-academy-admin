// hook
import { useEffect } from "react";
// components
import Button from "src/components/Button";
// AOS
import Aos from "aos";
import "aos/dist/aos.css";
// PropTypes
import PropTypes from "prop-types";

const Confirmation = ({ text, closeModal, confirmModal }) => {
  useEffect(() => {
    // Bloque le scroll quand le modal est monté
    document.body.classList.add("overflow-hidden");

    // Nettoyage : Débloque le scroll quand le modal est démonté
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleClickStopPropagetion = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClickStopPropagetion}
      className="w-[375px] rounded-xl bg-white px-2 py-5 text-center sm:w-[450px] md:w-auto md:px-8 md:py-5"
      data-aos="zoom-in"
      data-aos-duration="200"
    >
      <h2 className="mb-5 text-2xl font-bold">{text}</h2>

      <div className="flex justify-center gap-x-5">
        <Button
          className="bg-[#b0181c] text-white hover:bg-[#7d2a2d]"
          onClick={closeModal}
        >
          Non, annuler
        </Button>

        <Button
          className="bg-[#448528] text-white hover:bg-[#1E5E03]"
          onClick={confirmModal}
        >
          Oui, confirmer
        </Button>
      </div>
    </div>
  );
};

// Props validation
Confirmation.propTypes = {
  text: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmModal: PropTypes.func.isRequired,
};

export default Confirmation;
