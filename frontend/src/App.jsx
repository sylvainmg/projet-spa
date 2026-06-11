import { useState, useEffect } from "react";
import {
  BarChart3,
  ClipboardList,
  FilePlus,
  Landmark,
  Moon,
  Sun,
} from "./components/icons";
import "./App.css";
import Login from "./components/Login";
import AddPret from "./components/AddPret";
import ListPret from "./components/ListPret";
import Bilan from "./components/Bilan";
import Historique from "./components/Historique";
import api from "./utils/axios";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState("add");
  const [prets, setPrets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // initial login, pour redirect automatiquement vers l'application
  useEffect(() => {
    const auth = async () => {
      try {
        await api.get("/auth/me");
        setIsConnected(true);
      } catch (err) {
        setIsConnected(false);
        localStorage.removeItem("token");
      }
    };

    auth();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  function handleLogin() {
    setIsConnected(true);
  }

  function handleAddPret(newPret) {
    const pretWithId = {
      ...newPret,
      id: Date.now(),
    };
    setPrets([...prets, pretWithId]);

    const now = new Date().toLocaleString("fr-FR");
    setLogs([
      {
        type: "add",
        message: `Prêt de ${pretWithId.nomClient} ajouté (${pretWithId.montant}€)`,
        date: now,
      },
      ...logs,
    ]);
  }

  function handleDeletePret(id) {
    const pretToDelete = prets.find((p) => p.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce prêt?")) {
      setPrets(prets.filter((p) => p.id !== id));

      const now = new Date().toLocaleString("fr-FR");
      setLogs([
        {
          type: "delete",
          message: `Prêt de ${pretToDelete.nomClient} supprimé`,
          date: now,
        },
        ...logs,
      ]);
    }
  }

  function handleEditPret(id) {
    setEditingId(id);
    setCurrentPage("add");
  }

  function handleUpdatePret(pretUpdated) {
    setPrets(
      prets.map((p) =>
        p.id === editingId ? { ...pretUpdated, id: editingId } : p,
      ),
    );

    const now = new Date().toLocaleString("fr-FR");
    setLogs([
      {
        type: "edit",
        message: `Prêt de ${pretUpdated.nomClient} modifié`,
        date: now,
      },
      ...logs,
    ]);

    setEditingId(null);
  }

  async function handleLogout() {
    // supprime le token
    await api.post("/auth/logout").then(() => localStorage.removeItem("token"));

    setIsConnected(false);
    setCurrentPage("add");
  }

  if (!isConnected) {
    return <Login onLogin={handleLogin} />;
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
              onClick={() => setCurrentPage("add")}
            >
              <FilePlus className="menu-icon" aria-hidden="true" /> Ajouter un
              prêt
            </button>

            <button
              className={`menu-item ${currentPage === "list" ? "active" : ""}`}
              onClick={() => setCurrentPage("list")}
            >
              <ClipboardList className="menu-icon" aria-hidden="true" /> Liste &
              Modification
            </button>

            <button
              className={`menu-item ${currentPage === "bilan" ? "active" : ""}`}
              onClick={() => setCurrentPage("bilan")}
            >
              <BarChart3 className="menu-icon" aria-hidden="true" /> Bilan &
              Graphes
            </button>

            <button
              className={`menu-item ${currentPage === "historique" ? "active" : ""}`}
              onClick={() => setCurrentPage("historique")}
            >
              <ClipboardList className="menu-icon" aria-hidden="true" />{" "}
              Historique
            </button>
          </nav>
        </aside>

        <main className="content">
          {currentPage === "add" && (
            <AddPret
              onAddPret={handleAddPret}
              onUpdatePret={handleUpdatePret}
              editingId={editingId}
              editingPret={prets.find((p) => p.id === editingId)}
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
    </div>
  );
}

export default App;
