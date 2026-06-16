import "../styles/ListPret.css";
import { useState } from "react";
import { ClipboardList, FilePlus, Pencil, Search, Trash2 } from "./icons";
import { spaceThounsands } from "../utils/spaceThousands";
import AppSpinner from "./AppSpinner";
function ListPret({ prets, onDelete, onEdit, isLoading }) {
  // Fonction pour calculer le montant à payer

  const [searchTerm, setSearchTerm] = useState("");
  function calculateMontantAPayer(montant, taux) {
    return parseFloat(montant) * (1 + parseFloat(taux) / 100);
  }
  const pretsFiltres = prets.filter(
    (pret) =>
      pret.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pret.nomBanque.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pret.numCompte.includes(searchTerm),
  );
  if (isLoading) return <AppSpinner />;
  return (
    <div className="list-pret-container">
      <h2>
        <ClipboardList className="section-icon" aria-hidden="true" /> Liste des
        Prêts
      </h2>
      <div className="search-container">
        <Search className="search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Chercher par nom client, banque ou numéro de compte..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {pretsFiltres.length === 0 ? (
        // Si aucun résultat
        <div className="empty-message">
          {searchTerm ? (
            <>
              <p>
                <Search className="empty-icon" aria-hidden="true" /> Aucun
                résultat pour "<strong>{searchTerm}</strong>"
              </p>
              <p>Essayez une autre recherche</p>
            </>
          ) : (
            <>
              <p>Aucun prêt enregistré.</p>
              <p>
                Allez à l'onglet{" "}
                <FilePlus className="inline-icon" aria-hidden="true" /> "Ajouter
                un prêt" pour commencer.
              </p>
            </>
          )}
        </div>
      ) : (
        // Si des prêts existent, affiche le tableau
        <div className="table-wrapper">
          <table className="prets-table">
            <thead>
              <tr>
                <th>Nom Client</th>
                <th>Banque</th>
                <th>Montant (Ar)</th>
                <th>Date</th>
                <th>Taux (%)</th>
                <th>Montant à Payer (Ar)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pretsFiltres.map((pret) => (
                <tr key={pret.numCompte}>
                  <td>{pret.nomClient}</td>
                  <td>{pret.nomBanque}</td>
                  <td>
                    {spaceThounsands(parseFloat(pret.montant).toFixed(2))}
                  </td>
                  <td>{pret.datePret}</td>
                  <td>{pret.tauxPret}%</td>
                  <td className="montant-a-payer">
                    {spaceThounsands(
                      calculateMontantAPayer(
                        pret.montant,
                        pret.tauxPret,
                      ).toFixed(2),
                    )}
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(pret.numCompte)}
                      aria-label="Modifier le prêt"
                    >
                      <Pencil aria-hidden="true" />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(pret.numCompte)}
                      aria-label="Supprimer le prêt"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListPret;
