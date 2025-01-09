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

router.delete("/deleteMessage"), (req, res) => {
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
};

module.exports = router;