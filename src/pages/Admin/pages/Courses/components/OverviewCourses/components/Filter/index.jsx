const Filter = ({ filterClickedRef }) => {
  return (
    <div
      ref={filterClickedRef}
      className="absolute right-5 top-7 z-10 bg-red-300 p-5"
    >
      <div>Disponible prochainement</div>
    </div>
  );
};

export default Filter;
