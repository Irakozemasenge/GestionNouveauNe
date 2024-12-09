const express = require("express");
const { Op, fn, col } = require("sequelize");
const { StockMedicament } = require("../models");

const router = express.Router();

// Schéma de validation Joi
const Joi = require("joi");

const stockMedicamentSchema = Joi.array()
  .items(
    Joi.object({
      nom_medicament: Joi.string().required().messages({
        "string.base": `Le nom du médicament doit être une chaîne de caractères.`,
        "any.required": `Le nom du médicament est obligatoire.`,
      }),
      quantite: Joi.number().integer().required().messages({
        "number.base": `La quantité doit être un nombre entier.`,
        "any.required": `La quantité est obligatoire.`,
      }),
      date_peremption: Joi.date().required().messages({
        "date.base": `La date de péremption doit être une date valide.`,
        "any.required": `La date de péremption est obligatoire.`,
      }),
    })
  )
  .min(1)
  .required()
  .messages({
    "array.base": `Les médicaments doivent être un tableau.`,
    "array.min": `Il doit y avoir au moins un médicament.`,
    "any.required": `Les médicaments sont obligatoires.`,
  });
// Route pour créer ou mettre à jour un stock de médicaments
router.post("/stockMedicaments", async (req, res) => {
  try {
    const { error } = stockMedicamentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const medicaments = req.body;

    for (const medicament of medicaments) {
      const { nom_medicament, quantite, date_peremption } = medicament;

      // Vérifier si le médicament avec le même nom et la même date de péremption existe
      const existingMedicament = await StockMedicament.findOne({
        where: {
          nom_medicament,
          [Op.and]: [
            fn("DATE", col("date_peremption")),
            fn("DATE", date_peremption),
          ],
        },
      });

      if (existingMedicament) {
        // Si le médicament existe, additionner la quantité
        existingMedicament.quantite =
          parseInt(existingMedicament.quantite) + parseInt(quantite);
        await existingMedicament.save();
        await existingMedicament.save();
      } else {
        // Sinon, créer un nouveau médicament
        await StockMedicament.create({
          nom_medicament,
          quantite,
          date_peremption,
        });
      }
    }

    res.status(201).json({ message: "L'insertion a été faite avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création ou de la mise à jour du stock de médicaments.",
    });
  }
});
// Route pour récupérer tous les stocks de médicaments avec pagination, filtrage et recherche
router.get("/stockMedicaments", async (req, res) => {
  try {
    const { page = 1, size = 10, search = "", expired } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const where = {
      [Op.and]: [
        {
          [Op.or]: {
            nom_medicament: {
              [Op.like]: `%${search}%`,
            },
            quantite: {
              [Op.like]: `%${search}%`,
            },
            date_peremption: {
              [Op.like]: `%${search}%`,
            },
          },
        },
        {
          quantite: {
            [Op.gt]: 0,
          },
        },
      ],
    };

    if (expired !== undefined) {
      where[Op.and].push({
        date_peremption:
          expired === "true"
            ? { [Op.lt]: new Date() }
            : { [Op.gte]: new Date() },
      });
    }

    const { rows, count } = await StockMedicament.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]], // Ajout du tri par ID décroissant
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      stockMedicaments: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// Route pour récupérer un stock de médicament par ID
router.get("/stockMedicaments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const stockMedicament = await StockMedicament.findByPk(id);

    if (!stockMedicament) {
      return res
        .status(404)
        .json({ message: "Stock de médicament non trouvé." });
    }

    res.status(200).json(stockMedicament);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du stock de médicament.",
    });
  }
});

// Route pour mettre à jour un stock de médicament par ID
router.put("/stockMedicaments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = stockMedicamentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const stockMedicament = await StockMedicament.findByPk(id);
    if (!stockMedicament) {
      return res
        .status(404)
        .json({ message: "Stock de médicament non trouvé." });
    }
    const elements = req.body;
    const { nom_medicament, quantite, date_peremption } = elements[0];
    await stockMedicament.update({
      nom_medicament,
      quantite,
      date_peremption,
    });

    res.status(200).json("dael done");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du stock de médicament.",
    });
  }
});
// Route pour supprimer un stock de médicament par ID
router.delete("/stockMedicaments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const stockMedicament = await StockMedicament.findByPk(id);

    if (!stockMedicament) {
      return res
        .status(404)
        .json({ message: "Stock de médicament non trouvé." });
    }

    await stockMedicament.destroy();
    res
      .status(204)
      .json({ message: "Stock de médicament supprimé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression du stock de médicament.",
    });
  }
});

module.exports = router;
