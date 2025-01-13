const express = require("express");
const router = express.Router();
const bdd = require("../bdd");
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;


// Route pour créer un administrateur
router.post("/CreateAdmin", async (req, res) => {
  const { Name, email, password } = req.body;

  if (!Name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const emailCheckQuery = "SELECT * FROM admin WHERE email = ?";
    bdd.query(emailCheckQuery, [email], async (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'email :", err);
        return res.status(500).send("Erreur serveur");
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "L'email est déjà utilisé" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertQuery =
        "INSERT INTO admin (Name, email, password) VALUES (?, ?, ?)";
      bdd.query(insertQuery, [Name, email, hashedPassword], (err) => {
        if (err) {
          console.error(
            "Erreur lors de la création de l'administrateur :",
            err
          );
          return res.status(500).send("Erreur serveur");
        }
        res.status(201).json({ message: "Administrateur créé avec succès" });
      });
    });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour l'authentification d'un administrateur
router.post("/loginAdmin", (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.secretKey;


  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const query = "SELECT * FROM admin WHERE email = ?";
  bdd.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).send("Erreur serveur");
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Administrateur non trouvé" });
    }

    const admin = results[0];

    try {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: admin.id_admin, email: admin.email },
        secretKey,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Connexion réussie",
        token,
      });
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
});

// Middleware pour vérifier le token 
function authenticate(req, res, next) {
    const secretKey = process.env.secretKey;
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "En-tête d'autorisation manquant" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    req.admin = decoded;
    next();
  });
}


module.exports = router;