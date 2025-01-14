const express = require("express");
const router = express.Router();
const bdd = require("../bdd");

//Récupérer tous les skills

router.get("/allSkills", (req, res) => {
    bdd.query("SELECT * FROM Skills", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération des compétences" });
        } else {
            res.json(result);
        }
    });
});

//Ajouter des skills

router.post("/addSkills", (req, res) => {
    const { Name, IconeTechno } = req.body;
    const query =
        "INSERT INTO Skills (Name, IconeTechno, category ) VALUES (?,?,?)";

    bdd.query(query, [Name,IconeTechno ], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de l'ajout des compétences" });
        } else {
            res.json({ message: "Compétences ajoutées avec succès" });
        }
    });
});

// Modifier une compétence

router.put("/updateSkills/:idSkills", (req, res) => {
    const { idSkills } = req.params;
    const { Titre, Name, IconeTechno } = req.body;

    const query =
        "UPDATE Skills SET Titre = ?, Name = ?, IconeTechno = ?, category = ? WHERE idSkills = ?";

    bdd.query(query, [Titre, Name, IconeTechno, idSkills], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la modification des compétences" });
        } else {
            res.json({ message: "Compétences modifiées avec succès" });
        }
    });
});

// Supprimer une compétence

router.delete("/deleteSkills/:idSkills", (req, res) => {
    const { idSkills } = req.params;

    const query = "DELETE FROM Skills WHERE idSkills = ?";
    bdd.query(query, [idSkills], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la suppression des compétences" });
        } else {
            res.json({ message: "Compétences supprimées avec succès" });
        }
    });
});

module.exports = router;