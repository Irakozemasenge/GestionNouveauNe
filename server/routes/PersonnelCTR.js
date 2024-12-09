const express = require('express');
const multer = require('multer');
const Joi = require('joi');
const { Personnel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const router = express.Router();

// Configuration de multer pour la gestion des fichiers de photo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/Personnel/');
    },
    filename: (req, file, cb) => {
        const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });



// Schéma de validation Joi pour chaque utilisateur
const userSchema = Joi.object({
    nom: Joi.string().required().messages({
        'string.base': `Le nom doit être une chaîne de caractères.`,
        'any.required': `Le nom est obligatoire.`
    }),
    prenom: Joi.string().required().messages({
        'string.base': `Le prénom doit être une chaîne de caractères.`,
        'any.required': `Le prénom est obligatoire.`
    }),
    role: Joi.string().valid('Médecin', 'Infirmier', 'Administratif').required().messages({
        'any.only': `Le rôle doit être parmi les suivants: Médecin, Infirmier, Administratif.`,
        'any.required': `Le rôle est obligatoire.`
    }),
    telephone: Joi.string().required().messages({
        'string.base': `Le téléphone doit être une chaîne de caractères.`,
        'any.required': `Le téléphone est obligatoire.`
    }),
    email: Joi.string().email().required().messages({
        'string.email': `L'email doit être un email valide.`,
        'any.required': `L'email est obligatoire.`
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')).required().messages({
        'string.pattern.base': `Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et doit être d'au moins 8 caractères.`,
        'any.required': `Le mot de passe est obligatoire.`
    }),
});


// Route pour créer plusieurs utilisateurs
router.post('/add', upload.any(), async (req, res) => {
    try {
        // Vérification si des fichiers ont été téléchargés
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Au moins une photo est obligatoire.' });
        }



        // Validation du schéma pour chaque utilisateur
        for (let i = 0; i < req.body.users.length; i++) {
            const userData = req.body.users[i]; // Accéder à chaque utilisateur dans le tableau
            const { error } = userSchema.validate(userData, { allowUnknown: true }); // Permettre les champs supplémentaires non définis dans le schéma
            if (error) {
                return res.status(400).json({ message: `Erreur de validation pour l'utilisateur ${i + 1}: ${error.details[0].message}` });
            }

            const { nom, prenom, role, telephone, email, password } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await Personnel.create({
                nom,
                prenom,
                role,
                telephone,
                email,
                password: hashedPassword,
                photo: req.files[i].filename // Stocke uniquement le nom du fichier
            });

        }

        res.status(201).json("Deal done");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création des utilisateurs.' });
    }
});





// Route pour récupérer tous les personnels avec pagination, filtrage par rôle et recherche
router.get('/all', async (req, res) => {
    try {
        const { page = 1, size = 10, role, search = '' } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;
        // Conver
        const options = {
            where: {
                [Op.or]: [
                    { nom: { [Op.like]: `%${search}%` } },
                    { prenom: { [Op.like]: `%${search}%` } },
                    { role: { [Op.like]: `%${search}%` } },
                    { telephone: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            },
            limit,
            offset,
            order: [['id', 'DESC']]
        };

        // Si un rôle est spécifié, ajouter une condition where pour le rôle
        if (role) {
            options.where.role = role;
        }

        const { rows, count } = await Personnel.findAndCountAll(options);


        return res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10),
            personnels: rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des personnels.' });
    }
});

// Route pour récupérer un personnel par ID
router.get('/OneById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const personnel = await Personnel.findByPk(id);

        if (!personnel) {
            return res.status(404).json({ message: 'Personnel non trouvé.' });
        }

        res.status(200).json(personnel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du personnel.' });
    }
});



// Schéma de validation pour la mise à jour
const updatePersonnelSchema = Joi.object({
    nom: Joi.string().optional().messages({
        'string.base': `Le nom doit être une chaîne de caractères.`
    }),
    prenom: Joi.string().optional().messages({
        'string.base': `Le prénom doit être une chaîne de caractères.`
    }),
    role: Joi.string().valid('Médecin', 'Infirmier', 'Administratif').optional().messages({
        'any.only': `Le rôle doit être parmi les suivants: Médecin, Infirmier, Administratif.`
    }),
    telephone: Joi.string().optional().messages({
        'string.base': `Le téléphone doit être une chaîne de caractères.`
    }),
    email: Joi.string().email().optional().messages({
        'string.email': `L'email doit être un email valide.`
    }),
    photo: Joi.string().allow('').optional().messages({
        'string.base': `La photo doit être une chaîne de caractères.`,
        'any.empty': `La photo est facultative.`
    }),
});
// Route pour mettre à jour un personnel par ID
router.put('/UpdateOneById/:id', upload.single('photo'), async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = updatePersonnelSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ message: 'Personnel non trouvé.' });
        }

        const { nom, prenom, role, telephone, email } = req.body;
        let updatedData = { nom, prenom, role, telephone, email };



        if (req.file) {
            updatedData.photo = req.file.filename; // Stocke uniquement le nom du fichier
        }

        await Personnel.update(updatedData, {
            where: { id }
        });

        const updatedPersonnel = await Personnel.findByPk(id);
        res.status(200).json(updatedPersonnel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du personnel.' });
    }
});

// Route pour supprimer un personnel par ID
router.delete('/DeleteById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const personnel = await Personnel.findByPk(id);

        if (!personnel) {
            return res.status(404).json({ message: 'Personnel non trouvé.' });
        }

        await Personnel.destroy({
            where: { id }
        });

        res.status(204).json({ message: 'Personnel supprimé avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du personnel.' });
    }
});

module.exports = router;
