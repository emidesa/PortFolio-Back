const express = require("express");
const router = express.Router();
const bdd = require("../bdd");

// Récupérer tous les messages

router.get("/allMessages", (req, res) => {
    bdd.query("SELECT * FROM Message", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des messages" });
        } else {
            res.json(result);
        }
    });
});

router.post("/contact", (req, res) => {
    const { Nom, Email, Contenu} = req.body;
    const query = "INSERT INTO Message (Nom, Email, Contenu) VALUES (?, ?, ?)";
    bdd.query(query, [Nom, Email, Contenu], (err) => {
        
      if (err)
        return res.status(500).send("Erreur lors de l'enregistrement du message");
      res.status(200).send("Message envoyé avec succès");
    });
  });
  

  router.delete("/deleteMessage/:idMessage", (req, res) => {
    const { idMessage } = req.params;
    const query = "DELETE FROM Message WHERE idMessage = ?";
  
    bdd.query(query, [idMessage], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la suppression du message" });
      } else {
        res.json({ message: "Message supprimé avec succès" });
      }
    });
  });
  

module.exports = router;