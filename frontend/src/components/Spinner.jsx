import "../styles/Spinner.css";

function Spinner() {
  const isDark = localStorage.getItem("darkMode") === "true";

  return (
    <div className="spinner-container" data-dark={isDark}>
      <div className="spinner" />
    </div>
  );
}

export default Spinner;
