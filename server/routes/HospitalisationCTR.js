const express = require('express');
const Joi = require('joi');
const { Hospitalisation, NouveauNe, Personnel, } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

// Schéma de validation avec Joi
const hospitalisationSchema = Joi.object({
    date_admission: Joi.date().required().messages({
        'any.required': 'La date d\'admission est obligatoire',
        'date.base': 'La date d\'admission doit être une date valide'
    }),
    date_sortie: Joi.date().required().messages({
        'any.required': 'La date de sortie est obligatoire',
        'date.base': 'La date de sortie doit être une date valide'
    }),
    raison_admission: Joi.string().required().messages({
        'any.required': 'La raison d\'admission est obligatoire'
    }),
    traitement: Joi.string().required().messages({
        'any.required': 'Le traitement est obligatoire'
    }),
    NouveauNeId: Joi.number().required().messages({
        'any.required': 'L\'identifiant du nouveau-né est obligatoire',
        'number.base': 'L\'identifiant du nouveau-né doit être un nombre'
    }),
    PersonnelId: Joi.number().required().messages({
        'any.required': 'L\'identifiant du personnel est obligatoire',
        'number.base': 'L\'identifiant du personnel doit être un nombre'
    })
});

// Route pour l'insertion d'un nouveau enfant hospitalisé
router.post('/Add', async (req, res) => {
    try {
        // Valider les données reçues dans la requête
        const { error, value } = hospitalisationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Les données sont valides, procéder à l'insertion
        const newHospitalisation = await Hospitalisation.create(req.body);
        return res.status(201).json("deal done");
    } catch (error) {
        console.error('Erreur lors de l\'insertion du nouveau enfant hospitalisé :', error.message);
        return res.status(500).json({ message: 'Erreur lors de l\'insertion du nouveau enfant hospitalisé' });
    }
});

router.get('/All', async (req, res) => {
    try {
        const { search, page = 1, size = 10 } = req.query;

        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { raison_admission: { [Op.like]: `%${search}%` } },
                { traitement: { [Op.like]: `%${search}%` } },
                { '$NouveauNe.nom$': { [Op.like]: `%${search}%` } },
                { '$NouveauNe.prenom$': { [Op.like]: `%${search}%` } },
            ];
        }

        const limit = parseInt(size, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const hospitalisationS = await Hospitalisation.findAndCountAll({
            where: whereClause,
            include: [
                { model: NouveauNe },
            ],
            limit,
            offset,
            order: [['id', 'DESC']]
        });

        const totalPages = Math.ceil(hospitalisationS.count / limit);

        res.status(200).json({
            hospitalisations: hospitalisationS.rows,
            totalItems: hospitalisationS.count,
            totalPages,
            currentPage: parseInt(page, 10),
            pageSize: limit

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des hospitalisationS.' });
    }
});

router.get('/OneById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Query the database for the specific medication usage
        const enfant_hospitalise = await Hospitalisation.findByPk(id, {
            include: [
                { model: Personnel },
                { model: NouveauNe },
            ],
        });

        if (!enfant_hospitalise) {
            return res.status(404).json({ message: 'Hospitalisation usagé non trouvée' });
        }

        res.status(200).json(enfant_hospitalise);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la Hospitalisation-used.' });
    }
});
module.exports = router;