const { Vaccination, NouveauNe, Personnel, StockMedicament, UsageMedicament } = require('../models');
const express = require('express');
const Joi = require('joi');
const { Op } = require('sequelize');
const router = express.Router();

// Schéma de validation Joi pour Vaccination
const VaccinationSchema = Joi.object({
    date_vaccination: Joi.date().required().messages({
        'date.base': 'La date de Vaccination doit être une date valide.',
        'any.required': 'La date de Vaccination est obligatoire.'
    }),
    vaccin: Joi.string().required().messages({
        'string.base': 'Le diagnostic doit être une chaîne de caractères.',
        'any.required': 'Le diagnostic est obligatoire.'
    }),
    NouveauNeId: Joi.number().integer().required().messages({
        'number.base': 'L\'ID du nouveau-né doit être un nombre entier.',
        'any.required': 'L\'ID du nouveau-né est obligatoire.'
    }),
    PersonnelId: Joi.number().integer().required().messages({
        'number.base': 'L\'ID du personnel doit être un nombre entier.',
        'any.required': 'L\'ID du personnel est obligatoire.'
    }),
    UsageMedicaments: Joi.array().items(
        Joi.object({
            quantite_utilisee: Joi.number().integer().required().messages({
                'number.base': 'La quantite utilisee du medicament doit être un nombre entier.',
                'any.required': 'La quantite utilisee du medicament est obligatoire.'
            }),
            StockMedicamentId: Joi.number().integer().required().messages({
                'number.base': 'L\'ID du medicament doit être un nombre entier.',
                'any.required': 'L\'ID du medicament est obligatoire.'
            }),
        })
    ).min(1).required().messages({
        'array.base': `Les parents doivent être un tableau.`,
        'array.min': `Il doit y avoir au moins 1 parent.`,
        'any.required': `Les parents sont obligatoires.`
    })
});
// Route pour créer une nouvelle Vaccination
router.post('/Add', async (req, res) => {
    try {
        const { error } = VaccinationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { date_vaccination, vaccin, NouveauNeId, PersonnelId, UsageMedicaments } = req.body;

        const OneVaccination = await Vaccination.create({
            date_vaccination,
            vaccin,
            NouveauNeId,
            PersonnelId
        });

        for (const UsageMedicamentsData of UsageMedicaments) {
            const { StockMedicamentId, quantite_utilisee } = UsageMedicamentsData;
            await UsageMedicament.create({
                NouveauNeId,
                PersonnelId,
                quantite_utilisee,
                StockMedicamentId,
                date_utilisation: date_vaccination
            });

            const findMedicamentinStock = await StockMedicament.findOne({ where: { id: StockMedicamentId } });
            findMedicamentinStock.quantite -= parseInt(quantite_utilisee);
            await findMedicamentinStock.save();
        }

        res.status(201).json({ message: 'Vaccination créée avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de la Vaccination.' });
    }
});
// Route pour obtenir toutes les Vaccinations avec des filtres de recherche, pagination et recherche globale
router.get('/All', async (req, res) => {
    try {
        const { search, page = 1, size = 10 } = req.query;

        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { date_vaccination: { [Op.like]: `%${search}%` } },
                { vaccin: { [Op.like]: `%${search}%` } },
                { '$NouveauNe.nom$': { [Op.like]: `%${search}%` } },
                { '$NouveauNe.prenom$': { [Op.like]: `%${search}%` } },
            ];
        }

        const limit = parseInt(size, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const Vaccinations = await Vaccination.findAndCountAll({
            where: whereClause,
            include: [
                { model: NouveauNe },
            ],
            limit,
            offset,
            order: [['id', 'DESC']]
        });

        const totalPages = Math.ceil(Vaccinations.count / limit);

        res.status(200).json({
            Vaccinations: Vaccinations.rows,
            totalItems: Vaccinations.count,
            totalPages,
            currentPage: parseInt(page, 10),
            pageSize: limit

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des Vaccinations.' });
    }
});
// Route pour obtenir une Vaccination par ID avec les informations associées
router.get('/oneById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const vaccination_ = await Vaccination.findOne({
            where: { id },
            include: [
                { model: NouveauNe },
                { model: Personnel }
            ]
        });

        if (!vaccination_) {
            return res.status(404).json({ message: 'Vaccination non trouvée' });
        }

        res.status(200).json(vaccination_);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la vaccination_.' });
    }
});
module.exports = router;
