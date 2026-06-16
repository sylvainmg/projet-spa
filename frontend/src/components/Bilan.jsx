import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "./icons";
import "../styles/Bilan.css";
import { spaceThounsands } from "../utils/spaceThousands";
import AppSpinner from "./AppSpinner";

function Bilan({ prets, isLoading }) {
  // Calcul du montant à payer
  function calculateMontantAPayer(montant, taux) {
    return parseFloat(montant) * (1 + parseFloat(taux) / 100);
  }

  // Préparer les données
  const donneesTableau = prets.map((p) => ({
    ...p,
    montantAPayer: calculateMontantAPayer(p.montant, p.tauxPret),
  }));

  // Calculs du bilan
  const montants = donneesTableau.map((p) => p.montantAPayer);
  const total = montants.reduce((a, b) => a + b, 0);
  const minimal = montants.length > 0 ? Math.min(...montants) : 0;
  const maximal = montants.length > 0 ? Math.max(...montants) : 0;

  // Données pour le graphique en barres
  const dataBarChart = donneesTableau.map((p) => ({
    nom: p.nomClient.substring(0, 10),
    montant: p.montantAPayer,
  }));

  // Données pour le camembert
  const dataPieChart = donneesTableau.map((p) => ({
    name: p.nomClient,
    value: p.montantAPayer,
  }));

  const COLORS = [
    "#667eea",
    "#764ba2",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
  ];

  if (isLoading) return <AppSpinner />;

  return (
    <div className="bilan-container">
      <h2>
        <BarChart3 className="section-icon" aria-hidden="true" /> Bilan
        Financier
      </h2>

      {prets.length === 0 ? (
        <div className="empty-message">
          <p>Aucun prêt enregistré. Ajoutez des prêts pour voir le bilan.</p>
        </div>
      ) : (
        <>
          {/* CARTES DE RÉSUMÉ */}
          <div className="bilan-cards">
            <div className="card">
              <div className="card-label">Montant Total à Payer</div>
              <div className="card-value">
                Ar{spaceThounsands(total.toFixed(2))}
              </div>
            </div>
            <div className="card">
              <div className="card-label">Montant Minimal</div>
              <div className="card-value">
                Ar{spaceThounsands(minimal.toFixed(2))}
              </div>
            </div>
            <div className="card">
              <div className="card-label">Montant Maximal</div>
              <div className="card-value">
                Ar{spaceThounsands(maximal.toFixed(2))}
              </div>
            </div>
            <div className="card">
              <div className="card-label">Nombre de Prêts</div>
              <div className="card-value">{spaceThounsands(prets.length)}</div>
            </div>
          </div>

          {/* GRAPHIQUES */}
          <div className="charts-container">
            {/* HISTOGRAMME */}
            <div className="chart-box">
              <h3>Montants par Client (Histogramme)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={dataBarChart}
                  margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="nom"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => `Ar${value.toFixed(2)}`} />
                  <Bar dataKey="montant" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CAMEMBERT */}
            <div className="chart-box">
              <h3>Distribution (Camembert)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPieChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name.substring(0, 8)}: Ar${value.toFixed(0)}`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataPieChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Ar${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Bilan;
