const express = require("express");
const router = express.Router();
const bdd = require("../bdd");


// Récupérer tous les projets

router.get("/allProjets", (req, res) => {
    bdd.query("SELECT * FROM Projet", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des projets" });
        } else {
            res.json(result);
        }
    });
});

// Ajouter un projet

router.post("/addProjet", (req, res) => {
    const { Titre, description, Technologie, LienGit, Image } = req.body;

    const query =
        "INSERT INTO Projet (Titre, description, Technologie, LienGit, Image) VALUES (?,?,?,?,?)";

    bdd.query(query, [Titre, description, Technologie, LienGit, Image], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de l'ajout du projet" });
        } else {
            res.json({ message: "Projet ajouté avec succès" });
        }
    });
});

// Modifier un projet

router.put("/updateProjet/:idProjet", (req, res) => {
    const { idProjet } = req.params;
    const { Titre, description, Technologie, LienGit, Image } = req.body;

    const query =
        "UPDATE Projet SET Titre = ?, description = ?, Technologie = ?, LienGit = ?, Image = ? WHERE idProjet = ?";

    bdd.query(query, [Titre, description, Technologie, LienGit, Image, idProjet], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la modification du projet" });
        } else {
            res.json({ message: "Projet modifié avec succès" });
        }
    });
});

// Supprimer un projet

router.delete("/deleteProjet/:idProjet", (req, res) => {
    const { idProjet } = req.params;

    const query = "DELETE FROM Projet WHERE idProjet =?";
    bdd.query(query, [idProjet], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la suppression du projet" });
        } else {
            res.json({ message: "Projet supprimé avec succès" });
        }
    });
});

module.exports = router;