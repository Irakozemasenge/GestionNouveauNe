const express = require('express');
const { NouveauNe, Parent, NouveauNeParent } = require('../models');
const { Op } = require('sequelize');
const Joi = require('joi');

const router = express.Router();

// Schéma de validation Joi pour NouveauNe et Parents
const nouveauNeSchema = Joi.object({
    nom: Joi.string().required().messages({
        'string.base': `Le nom doit être une chaîne de caractères.`,
        'any.required': `Le nom est obligatoire.`
    }),
    prenom: Joi.string().required().messages({
        'string.base': `Le prénom doit être une chaîne de caractères.`,
        'any.required': `Le prénom est obligatoire.`
    }),
    date_naissance: Joi.date().required().messages({
        'date.base': `La date de naissance doit être une date valide.`,
        'any.required': `La date de naissance est obligatoire.`
    }),
    sexe: Joi.string().valid('M', 'F').required().messages({
        'any.only': `Le sexe doit être 'M' ou 'F'.`,
        'any.required': `Le sexe est obligatoire.`
    }),
    poids_naissance: Joi.number().precision(2).required().messages({
        'number.base': `Le poids de naissance doit être un nombre décimal.`,
        'any.required': `Le poids de naissance est obligatoire.`
    }),
    taille_naissance: Joi.number().precision(1).required().messages({
        'number.base': `La taille de naissance doit être un nombre décimal.`,
        'any.required': `La taille de naissance est obligatoire.`
    }),
    groupe_sanguin: Joi.string().valid('A', 'B', 'AB', 'O').required().messages({
        'any.only': `Le groupe sanguin doit être 'A', 'B', 'AB', ou 'O'.`,
        'any.required': `Le groupe sanguin est obligatoire.`
    }),
    rhesus: Joi.string().valid('+', '-').required().messages({
        'any.only': `Le rhésus doit être '+' ou '-'.`,
        'any.required': `Le rhésus est obligatoire.`
    }),
    observations: Joi.string().optional().allow(null, '').messages({
        'string.base': `Les observations doivent être une chaîne de caractères.`
    }),
    parents: Joi.array().items(
        Joi.object({
            nom: Joi.string().required().messages({
                'string.base': `Le nom du parent doit être une chaîne de caractères.`,
                'any.required': `Le nom du parent est obligatoire.`
            }),
            prenom: Joi.string().required().messages({
                'string.base': `Le prénom du parent doit être une chaîne de caractères.`,
                'any.required': `Le prénom du parent est obligatoire.`
            }),
            adresse: Joi.string().required().messages({
                'string.base': `L'adresse du parent doit être une chaîne de caractères.`,
                'any.required': `L'adresse du parent est obligatoire.`
            }),
            telephone: Joi.string().required().messages({
                'string.base': `Le téléphone du parent doit être une chaîne de caractères.`,
                'any.required': `Le téléphone du parent est obligatoire.`
            }),
            email: Joi.string().email().required().messages({
                'string.base': `L'email du parent doit être une chaîne de caractères.`,
                'string.email': `L'email du parent doit être une adresse email valide.`,
                'any.required': `L'email du parent est obligatoire.`
            }),
            relation: Joi.string().valid('Mère', 'Père', 'Tuteur').required().messages({
                'any.only': `La relation doit être 'Mère', 'Père', ou 'Tuteur'.`,
                'any.required': `La relation est obligatoire.`
            })
        })
    ).min(1).max(3).required().messages({
        'array.base': `Les parents doivent être un tableau.`,
        'array.min': `Il doit y avoir au moins 1 parent.`,
        'array.max': `Il doit y avoir au maximum 3 parents.`,
        'any.required': `Les parents sont obligatoires.`
    })
});

// Route pour créer un nouveau-né avec ses parents et les relations
router.post('/Add', async (req, res) => {
    try {
        const { error } = nouveauNeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {
            nom, prenom, date_naissance, sexe, poids_naissance,
            taille_naissance, groupe_sanguin, rhesus, observations, parents
        } = req.body;

        // Créer un nouveau-né
        const nouveauNe = await NouveauNe.create({
            nom, prenom, date_naissance, sexe, poids_naissance,
            taille_naissance, groupe_sanguin, rhesus, observations
        });

        // Traiter les parents et leurs relations
        for (const parentData of parents) {
            const { nom, prenom, adresse, telephone, email, relation } = parentData;

            // Vérifier si le parent existe déjà
            let parent = await Parent.findOne({
                where: {
                    [Op.and]: [
                        { nom },
                        { prenom },
                        { email }
                    ]
                }
            });

            // Si le parent n'existe pas, le créer
            if (!parent) {
                parent = await Parent.create({ nom, prenom, adresse, telephone, email });
            }

            // Créer la relation entre le nouveau-né et le parent
            await NouveauNeParent.create({
                NouveauNeId: nouveauNe.id,
                ParentId: parent.id,
                relation
            });
        }

        res.status(201).json({ message: 'Nouveau-né créé avec succès', nouveauNe });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du nouveau-né.' });
    }
});
// Route pour récupérer tous les nouveau-nés avec pagination
router.get('/All', async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;

        // Convertir page et size en nombres
        const pageNumber = parseInt(page, 10);
        const sizeNumber = parseInt(size, 10);

        const options = {
            where: {
                [Op.or]: [
                    { nom: { [Op.like]: `%${search}%` } },
                    { prenom: { [Op.like]: `%${search}%` } },
                    { sexe: { [Op.like]: `%${search}%` } },
                    { groupe_sanguin: { [Op.like]: `%${search}%` } },
                    { rhesus: { [Op.like]: `%${search}%` } }
                ]
            },
            limit: sizeNumber,
            offset: (pageNumber - 1) * sizeNumber,
            order: [['id', 'DESC']]
        };

        const { rows, count } = await NouveauNe.findAndCountAll(options);

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / sizeNumber),
            currentPage: pageNumber,
            nouveauNes: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des nouveau-nés.' });
    }
});

// Route pour récupérer un nouveau-né par son ID avec ses parents et les relations
router.get('/OneById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Trouver le nouveau-né par ID
        const nouveauNe = await NouveauNe.findOne({
            where: { id },
            include: [
                {
                    model: Parent,
                    through: {
                        model: NouveauNeParent,
                        attributes: ['relation']
                    }
                }
            ]
        });

        if (!nouveauNe) {
            return res.status(404).json({ message: 'Nouveau-né non trouvé.' });
        }

        res.status(200).json(nouveauNe);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du nouveau-né.' });
    }
});

// Schéma de validation Joi pour la mise à jour des informations personnelles d'un nouveau-né
const updateNouveauNeSchema = Joi.object({
    nom: Joi.string().optional().messages({
        'string.base': `Le nom doit être une chaîne de caractères.`
    }),
    prenom: Joi.string().optional().messages({
        'string.base': `Le prénom doit être une chaîne de caractères.`
    }),
    date_naissance: Joi.date().optional().messages({
        'date.base': `La date de naissance doit être une date valide.`
    }),
    sexe: Joi.string().valid('M', 'F').optional().messages({
        'any.only': `Le sexe doit être 'M' ou 'F'.`
    }),
    poids_naissance: Joi.number().precision(2).optional().messages({
        'number.base': `Le poids de naissance doit être un nombre décimal.`
    }),
    taille_naissance: Joi.number().precision(1).optional().messages({
        'number.base': `La taille de naissance doit être un nombre décimal.`
    }),
    groupe_sanguin: Joi.string().valid('A', 'B', 'AB', 'O').optional().messages({
        'any.only': `Le groupe sanguin doit être 'A', 'B', 'AB', ou 'O'.`
    }),
    rhesus: Joi.string().valid('+', '-').optional().messages({
        'any.only': `Le rhésus doit être '+' ou '-'.`
    }),
    observations: Joi.string().optional().allow(null, '').messages({
        'string.base': `Les observations doivent être une chaîne de caractères.`
    })
});

// Route pour mettre à jour les informations personnelles d'un nouveau-né
router.put('/OneById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = updateNouveauNeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const nouveauNe = await NouveauNe.findByPk(id);
        if (!nouveauNe) {
            return res.status(404).json({ message: 'Nouveau-né non trouvé' });
        }

        await nouveauNe.update(req.body);
        res.status(200).json({ message: 'Informations du nouveau-né mises à jour avec succès', nouveauNe });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du nouveau-né.' });
    }
});

router.get('/OneParentById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const parent = await Parent.findOne({
            where: { id: id },
            include: [
                {
                    model: NouveauNe,
                    attributes: ["id"],
                    through: {
                        model: NouveauNeParent,
                        attributes: ['relation'],
                    },
                },
            ],
        });

        if (!parent) {
            return res.status(404).json({ message: 'Parent non trouvé.' });
        }

        // Transform the response to include the relation directly
        const response = {
            id: parent.id,
            nom: parent.nom,
            prenom: parent.prenom,
            adresse: parent.adresse,
            telephone: parent.telephone,
            email: parent.email,
            relation: parent.NouveauNes.length > 0 ? parent.NouveauNes[0].NouveauNeParent.relation : null,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du parent.' });
    }
});

// Schéma de validation Joi pour la mise à jour des informations d'un parent
const updateParentSchema = Joi.object({
    nom: Joi.string().optional().messages({
        'string.base': `Le nom du parent doit être une chaîne de caractères.`
    }),
    prenom: Joi.string().optional().messages({
        'string.base': `Le prénom du parent doit être une chaîne de caractères.`
    }),
    adresse: Joi.string().optional().messages({
        'string.base': `L'adresse du parent doit être une chaîne de caractères.`
    }),
    telephone: Joi.string().optional().messages({
        'string.base': `Le téléphone du parent doit être une chaîne de caractères.`
    }),
    email: Joi.string().email().optional().messages({
        'string.base': `L'email du parent doit être une chaîne de caractères.`,
        'string.email': `L'email du parent doit être une adresse email valide.`
    }),
    relation: Joi.string().valid('Mère', 'Père', 'Tuteur').optional().messages({
        'any.only': `La relation doit être 'Mère', 'Père', ou 'Tuteur'.`
    })
});

// Route pour mettre à jour les informations d'un parent
router.put('/parentOneById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = updateParentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const parentId = req.params.id;
        const { nom, prenom, adresse, telephone, email, relation } = req.body;

        // Trouver le parent existant
        let parent = await Parent.findByPk(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent non trouvé' });
        }

        // Mettre à jour les informations du parent
        parent.nom = nom;
        parent.prenom = prenom;
        parent.adresse = adresse;
        parent.telephone = telephone;
        parent.email = email;
        await parent.save();

        // Mettre à jour la relation du parent

        // Vérifier si la relation existe
        let nouveauNeParent = await NouveauNeParent.findOne({
            where: {
                ParentId: parentId
            }
        });
        // Si la relation existe, la mettre à jour
        nouveauNeParent.relation = relation;
        await nouveauNeParent.save();

        res.status(200).json({ message: 'Parent et relation mis à jour avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du parent.' });
    }
});

// Route pour supprimer un parent et sa relation avec un nouveau-né
router.delete('/parentOneById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const parent = await Parent.findByPk(id);
        if (!parent) {
            return res.status(404).json({ message: 'Parent non trouvé' });
        }

        // Supprimer les relations du parent avec les nouveau-nés
        await NouveauNeParent.destroy({
            where: { ParentId: id }
        });

        // Supprimer le parent
        await parent.destroy();

        res.status(200).json({ message: 'Parent et ses relations supprimés avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du parent.' });
    }
});

module.exports = router;
