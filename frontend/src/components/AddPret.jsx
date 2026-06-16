import { useState } from "react";
import { FilePlus, Pencil } from "./icons";
import "../styles/AddPret.css";
import AppSpinner from "./AppSpinner";

function AddPret({
  onAddPret,
  onUpdatePret,
  editingId,
  editingPret,
  onError,
  isLoading,
}) {
  // État pour chaque champ du formulaire
  const [formData, setFormData] = useState(
    editingPret || {
      numCompte: "",
      nomClient: "",
      nomBanque: "",
      montant: "",
      datePret: "",
      tauxPret: "",
    },
  );

  // Fonction appelée quand on change un champ
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Fonction appelée quand on clique "Ajouter"
  async function handleSubmit(e) {
    e.preventDefault();

    // Validation: vérifier que tous les champs sont remplis
    if (
      !formData.numCompte ||
      !formData.nomClient ||
      !formData.nomBanque ||
      !formData.montant ||
      !formData.datePret ||
      !formData.tauxPret
    ) {
      onError("Tous les champs sont requis.");
      return;
    }

    // Validation: vérifier que le montant est positif
    if (parseFloat(formData.montant) <= 0) {
      onError("Le montant doit être positif.");
      return;
    }

    let success = false;

    // Si on édite ou si on ajoute
    if (editingId) {
      if (onUpdatePret) {
        success = await onUpdatePret(formData);
      }
    } else {
      if (onAddPret) {
        success = onAddPret(formData);
      }
    }
    // Réinitialiser le formulaire
    if (success) {
      setFormData({
        numCompte: "",
        nomClient: "",
        nomBanque: "",
        montant: "",
        datePret: "",
        tauxPret: "",
      });
    }
  }

  if (isLoading) return <AppSpinner />;

  return (
    <div className="add-pret-container">
      <h2>
        {editingId ? (
          <>
            <Pencil className="section-icon" aria-hidden="true" /> Modifier le
            prêt
          </>
        ) : (
          <>
            <FilePlus className="section-icon" aria-hidden="true" /> Ajouter un
            nouveau prêt
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="pret-form">
        {/* Première ligne: Numéro de compte + Nom client */}
        <div className="form-row">
          <div className="form-group">
            <label>Numéro de Compte *</label>
            <input
              type="text"
              name="numCompte"
              value={formData.numCompte}
              onChange={handleInputChange}
              placeholder="Ex: 1234567890"
            />
          </div>

          <div className="form-group">
            <label>Nom du Client *</label>
            <input
              type="text"
              name="nomClient"
              value={formData.nomClient}
              onChange={handleInputChange}
              placeholder="Ex: Jean Dupont"
            />
          </div>
        </div>

        {/* Deuxième ligne: Banque + Montant */}
        <div className="form-row">
          <div className="form-group">
            <label>Nom de la Banque *</label>
            <input
              type="text"
              name="nomBanque"
              value={formData.nomBanque}
              onChange={handleInputChange}
              placeholder="Ex: BNP Paribas"
            />
          </div>

          <div className="form-group">
            <label>Montant (Ar) *</label>
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleInputChange}
              placeholder="Ex: 50000"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Troisième ligne: Date + Taux */}
        <div className="form-row">
          <div className="form-group">
            <label>Date du Prêt *</label>
            <input
              type="date"
              name="datePret"
              value={formData.datePret}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Taux du Prêt (%) *</label>
            <input
              type="number"
              name="tauxPret"
              value={formData.tauxPret}
              onChange={handleInputChange}
              placeholder="Ex: 5.5"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {editingId ? "Mettre à jour" : "Ajouter le prêt"}
        </button>
      </form>
    </div>
  );
}

export default AddPret;
