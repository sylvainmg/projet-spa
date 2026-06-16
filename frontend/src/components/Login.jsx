import { useState } from "react";
import { Eye, Landmark, Lock } from "./icons";
import api from "../utils/axios";
import "../styles/Login.css";

function Login({ onLogin, darkMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const { data, status } = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      if (status === 200) onLogin();
    } catch (error) {
      setError(error.response?.data?.message || "");
    }
  }

  return (
    <div className="login-container" data-theme={darkMode ? "dark" : "light"}>
      <div className="login-box">
        <h1>
          <Landmark className="title-icon" aria-hidden="true" /> Gestion des
          Prêts
        </h1>
        <p>Connectez-vous pour continuer</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="form-group password-group">
            <label>Mot de passe</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <Eye aria-hidden="true" />
                ) : (
                  <Lock aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
