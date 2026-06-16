import { ClipboardList, FilePlus, Pencil, Trash2 } from "./icons";
import "../styles/Historique.css";

function Historique({ logs }) {
  const logIcons = {
    add: FilePlus,
    delete: Trash2,
    edit: Pencil,
  };

  return (
    <div className="historique-container">
      <h2>
        <ClipboardList className="section-icon" aria-hidden="true" /> Historique
        des Actions
      </h2>

      {logs.length === 0 ? (
        <div className="empty-message">
          <p>Aucune action enregistrée pour le moment.</p>
        </div>
      ) : (
        <div className="logs-list">
          {logs.map((log) => {
            const LogIcon = logIcons[log.type] || ClipboardList;

            return (
              <div key={log.id} className="log-item">
                <div className="log-icon">
                  <LogIcon aria-hidden="true" />
                </div>
                <div className="log-content">
                  <div className="log-title">{log.message}</div>
                  <div className="log-date">
                    {new Date(log.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Historique;
