const express = require("express");
const router = express.Router();
const bdd = require("../bdd");


// Récupérer tous les parcours

router.get("/allParcours", (req, res) => {
    bdd.query("SELECT * FROM Parcours", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des parcours" });
        } else {
            res.json(result);
        }
    });
});

// Ajouter un parcours

router.post("/addParcours", (req, res) => {
    const { Titre, Date, Description, Entreprise } = req.body;

    const query =
        "INSERT INTO Parcours (Titre, Date, Description, Entreprise) VALUES (?,?,?,?)";

    bdd.query(query, [Titre, Date, Description, Entreprise], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de l'ajout du parcours" });
        } else {
            res.json({ message: "Parcours ajouté avec succès" });
        }
    });
});

// Modifier un parcours

router.put("/updateParcours/:idParcours", (req, res) => {
    const { idParcours } = req.params;
    const { Titre, Date, Description, Entreprise } = req.body;

    const query =
        "UPDATE Parcours SET Titre = ?, Date = ?, Description = ?, Entreprise = ? WHERE idParcours = ?";

    bdd.query(query, [Titre, Date, Description, Entreprise, idParcours], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la modification du parcours" });
        } else {
            res.json({ message: "Parcours modifié avec succès" });
        }
    });
});

// Supprimer un parcours

router.delete("/deleteParcours/:idParcours", (req, res) => {
    const { idParcours } = req.params;
    const query = "DELETE FROM Parcours WHERE idParcours = ?";

    bdd.query(query, [idParcours], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la suppression du parcours" });
        } else {
            res.json({ message: "Parcours supprimé avec succès" });
        }
    });
});

module.exports = router;