import { useState, useEffect } from "react";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  ClipboardList,
  FilePlus,
  Landmark,
  Moon,
  Pencil,
  Sun,
} from "./components/icons";
import "./App.css";
import Login from "./components/Login";
import AddPret from "./components/AddPret";
import ListPret from "./components/ListPret";
import Bilan from "./components/Bilan";
import Historique from "./components/Historique";
import api from "./utils/axios";
import Swal from "sweetalert2";
import Spinner from "./components/Spinner";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState("add");
  const [prets, setPrets] = useState([]);
  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // initial login, pour redirect automatiquement vers l'application
  const fetchPrets = async () => {
    const { data } = await api.get("/prets");
    setPrets(data.data);
  };

  const fetchLogs = async () => {
    const { data } = await api.get("/historique");
    setLogs(data.data);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = async () => {
      try {
        await api.get("/auth/me");
        setIsConnected(true);

        await fetchPrets();
        await fetchLogs();
      } catch (err) {
        setIsConnected(false);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    auth();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  const [notification, setNotification] = useState(null); // { message, type }

  function notify(message, type = "success") {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function getErrorMessage(err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      return Object.values(errors)[0][0];
    }
    return err.response?.data?.message || "Une erreur est survenue.";
  }

  async function handleLogin() {
    setIsConnected(true);
    await fetchPrets();
    await fetchLogs();
  }

  async function handleAddPret(newPret) {
    try {
      setLoadingAdd(true);
      const { data } = await api.post("/prets", newPret);

      await fetchPrets(); // récupérer la version fraîche de la liste
      await fetchLogs();
      notify(data.message);
      setLoadingAdd(false);

      return true;
    } catch (err) {
      notify(getErrorMessage(err), "error");

      return false;
    }
  }

  async function handleDeletePret(numCompte) {
    const result = await Swal.fire({
      title: "Confirmer la suppression",
      text: "Êtes-vous sûr de vouloir supprimer ce prêt ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: darkMode ? "#f87171" : "#ef4444",
      cancelButtonColor: darkMode ? "#334155" : "#64748b",
      background: darkMode ? "#1e293b" : "#ffffff",
      color: darkMode ? "#f1f5f9" : "#0f172a",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.delete(`/prets/${numCompte}`);

        setPrets((prev) => prev.filter((p) => p.numCompte !== numCompte));
        await fetchLogs();
        notify(data.message);
      } catch (err) {
        notify(getErrorMessage(err), "error");
      }
    }
  }

  function handleEditPret(numCompte) {
    setEditingId(numCompte);
    setCurrentPage("add");
  }

  async function handleUpdatePret(pretUpdated) {
    try {
      setLoadingAdd(true);
      const { data } = await api.put(`/prets/${editingId}`, pretUpdated);

      await fetchPrets(); // récupérer la version fraîche de la liste
      await fetchLogs();
      setEditingId(null);
      setLoadingAdd(false);

      setCurrentPage("list");
      notify(data.message);

      return true;
    } catch (err) {
      notify(getErrorMessage(err), "error");

      return false;
    }
  }

  async function handleLogout() {
    // supprime le token
    setLoadingLogout(true);
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setLoadingLogout(false);

    setIsConnected(false);
    setCurrentPage("add");
  }

  if (loadingLogout) return <Spinner />;

  if (isLoading) {
    return <Spinner />;
  }

  if (!isConnected) {
    return <Login onLogin={handleLogin} darkMode={darkMode} />;
  }

  function handleNavChange(fn, arg) {
    fn(arg);
    if (editingId) setEditingId(null);
  }
  return (
    <div className="app-container" data-theme={darkMode ? "dark" : "light"}>
      <header className="header">
        <h1>
          <Landmark className="title-icon" aria-hidden="true" /> Gestion des
          Prêts Bancaires
        </h1>
        <div className="header-actions">
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            title={darkMode ? "Mode clair" : "Mode sombre"}
            aria-label={
              darkMode ? "Activer le mode clair" : "Activer le mode sombre"
            }
          >
            {darkMode ? (
              <Sun aria-hidden="true" />
            ) : (
              <Moon aria-hidden="true" />
            )}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <nav className="menu">
            <button
              className={`menu-item ${currentPage === "add" ? "active" : ""}`}
              onClick={() => {
                handleNavChange(setCurrentPage, "add");
              }}
            >
              {editingId ? (
                <Pencil className="menu-icon" aria-hidden="true" />
              ) : (
                <FilePlus className="menu-icon" aria-hidden="true" />
              )}
              {editingId ? "Modifier le Prêt" : "Ajouter un prêt"}
            </button>

            <button
              className={`menu-item ${currentPage === "list" ? "active" : ""}`}
              onClick={() => {
                handleNavChange(setCurrentPage, "list");
              }}
            >
              <ClipboardList className="menu-icon" aria-hidden="true" /> Liste &
              Modification
            </button>

            <button
              className={`menu-item ${currentPage === "bilan" ? "active" : ""}`}
              onClick={() => {
                handleNavChange(setCurrentPage, "bilan");
              }}
            >
              <BarChart3 className="menu-icon" aria-hidden="true" /> Bilan &
              Graphes
            </button>

            <button
              className={`menu-item ${currentPage === "historique" ? "active" : ""}`}
              onClick={() => {
                handleNavChange(setCurrentPage, "historique");
              }}
            >
              <ClipboardList className="menu-icon" aria-hidden="true" />{" "}
              Historique
            </button>
          </nav>
        </aside>

        <main className="content">
          {currentPage === "add" && (
            <AddPret
              isLoading={loadingAdd}
              key={editingId ?? "new"}
              onAddPret={handleAddPret}
              onUpdatePret={handleUpdatePret}
              onError={(msg) => notify(msg, "error")}
              editingId={editingId}
              editingPret={prets.find((p) => p.numCompte === editingId)}
            />
          )}
          {currentPage === "list" && (
            <ListPret
              prets={prets}
              onDelete={handleDeletePret}
              onEdit={handleEditPret}
            />
          )}
          {currentPage === "bilan" && <Bilan prets={prets} />}
          {currentPage === "historique" && <Historique logs={logs} />}
        </main>
      </div>

      {notification && (
        <div className={`message ${notification.type}`}>
          {notification.type === "success" ? (
            <CheckCircle aria-hidden="true" />
          ) : (
            <AlertCircle aria-hidden="true" />
          )}
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
