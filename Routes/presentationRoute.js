const express = require("express");
const router = express.Router();
const bdd = require("../bdd");
const { json } = require("body-parser");

// Récupérer toute ma présentation

router.get("/allPresentation", (req, res) => {
    bdd.query("SELECT * FROM Presentation", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des messages" });
        } else {
            res.json(result);
        }
    });
});

// Ajouter une présentation 

router.post("/addPresentation", (req, res) => {
    const { titre ,qualité, description, icone, photo } = req.body;
    const iconeJson =  JSON.stringify(icone);

    const query =
        "INSERT INTO Presentation (Titre, Qualité, description, Icone, photo) VALUES (?,?,?,?,?)";

    bdd.query(query, [titre, qualité, description, iconeJson, photo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de l'ajout de la présentation" });
        } else {
            res.json({ message: "Présentation ajoutée avec succès" });
        }
    });
});

// Récupération des icones
router.get("/allIcons", (req, res) => {
    bdd.query("SELECT icon_url FROM Icons", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des icônes" });
        } else {
            // Renvoie directement un tableau des URLs des icônes
            const icons = result.map(icon => icon.icon_url);
            res.json(icons);  // Renvoie le tableau des icônes
        }
    });
});


// modifier ma présentation

router.put("/updatePresentation/:idPresentation", (req, res) => {
    const { idPresentation } = req.params;
    const {Qualité, description, photo } = req.body;

    const query =
        "UPDATE Presentation SET Qualité = ?, description = ?, photo = ? WHERE idPresentation = ?";

    bdd.query(query, [Qualité, description, photo, idPresentation], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la modification de la présentation" });
        } else {
            res.json({ message: "Présentation modifiée avec succès" });
        }
    });
});

// Supprimer ma présentation 
router.delete("/deletePresentation/:idPresentation", (req, res) => {
    const { idPresentation } = req.params;
    const query = "DELETE FROM Presentation WHERE idPresentation = ?";

    bdd.query(query, [idPresentation], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la suppression de la présentation" });
        } else {
            res.json({ message: "Présentation supprimée avec succès" });
        }
    });
});

module.exports = router;