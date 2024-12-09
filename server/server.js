const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const { Op } = require('sequelize');
const { UsageMedicament, StockMedicament, Personnel, NouveauNe, Consultation, Vaccination, Hospitalisation } = require('./models');

const personnelsRoute = require('./routes/PersonnelCTR');
const medicanentRoute = require('./routes/MedicanentCTR');
const nouveauNeRoute = require('./routes/EnfantCTR');
const consultationRoute = require('./routes/ConsultationCTR');
const vaccinationRoute = require('./routes/VaccinationCTR');
const hospitalisationRoute = require('./routes/HospitalisationCTR');
// Définir le dossier des fichiers statiques
app.use('/uploads/Logo', express.static('./uploads/Logo'));
app.use('/uploads/Personnel', express.static('./uploads/Personnel'));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("<h1>Bonjour mon frère!<hr></h1>");
});
app.use("/user", personnelsRoute);
app.use("/medicanent", medicanentRoute);
app.use('/nouveauNe', nouveauNeRoute);
app.use('/consultation', consultationRoute);
app.use('/vaccination', vaccinationRoute);
app.use('/hospitalisation', hospitalisationRoute);

app.get('/api-medicament-used', async (req, res) => {
    try {
        const { size = 10, page = 1, search = '' } = req.query;

        // Calculer l'offset pour la pagination
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        // Construire la condition de recherche
        const searchCondition = search
            ? {
                [Op.or]: [
                    { '$StockMedicament.nom_medicament$': { [Op.like]: `%${search}%` } },
                    { '$Personnel.nom$': { [Op.like]: `%${search}%` } },
                    { '$NouveauNe.nom$': { [Op.like]: `%${search}%` } },
                ],
            }
            : {};

        // Requête avec pagination et recherche
        const medicament_used = await UsageMedicament.findAndCountAll({
            where: searchCondition,
            include: [
                { model: StockMedicament },
                { model: Personnel },
                { model: NouveauNe },
            ],
            limit: limit,
            offset: offset,
        });

        if (!medicament_used.rows.length) {
            return res.status(404).json({ message: 'Medicament usagé non trouvée' });
        }

        res.status(200).json({
            totalItems: medicament_used.count,
            totalPages: Math.ceil(medicament_used.count / limit),
            currentPage: parseInt(page),
            medicament_used: medicament_used.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la medicament-used.' });
    }
});
app.get('/api-medicament-oneused/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Query the database for the specific medication usage
        const medicament_used = await UsageMedicament.findByPk(id, {
            include: [
                { model: StockMedicament },
                { model: Personnel },
                { model: NouveauNe },
            ],
        });

        if (!medicament_used) {
            return res.status(404).json({ message: 'Medicament usagé non trouvée' });
        }

        res.status(200).json(medicament_used);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la medicament-used.' });
    }
});
// Route pour obtenir les statistiques
app.get('/statistiques', async (req, res) => {
    try {
        // Obtenir les statistiques pour chaque modèle
        const statistiques = {
            usageMedicamentCount: await UsageMedicament.count(),
            stockMedicamentCount: await StockMedicament.count(),
            personnelCount: await Personnel.count(),
            nouveauNeCount: await NouveauNe.count(),
            consultationCount: await Consultation.count(),
            vaccinationCount: await Vaccination.count(),
            hospitalisationCount: await Hospitalisation.count()
        };
        res.json(statistiques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = 8010;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur: http://localhost:${PORT}`);
});
