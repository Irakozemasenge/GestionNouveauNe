import React, { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBars from "./Compenent/Cote1/NavBars";
import SlideNavBars from "./Compenent/Cote1/SlideNavBars";
import Acceuile from "./Compenent/Cote1/Acceuile";
import Medica from "./Compenent/Cote1/Medica";
import Personne from "./Compenent/Cote1/Personne";
import AjouterPersone from "./Compenent/Cote1/AjouterPersone";
import ModifiePersone from "./Compenent/Cote1/ModifiePersone";
import Enfants from "./Compenent/Cote1/Enfants";
import AjoutMedica from "./Compenent/Cote1/AjoutMedica";
import ModifierMedic from "./Compenent/Cote1/ModifierMedic";
import DetailEnfants from "./Compenent/Cote1/DetailEnfants";
import MedicamentUsage from "./Compenent/Cote1/MedicamentUsage";
import Consult from "./Compenent/Cote1/Consult";
import DetailConsultant from "./Compenent/Cote1/DetailConsultant";
import Vaccination from "./Compenent/Cote1/Vaccination";
import EnfantHospitali from "./Compenent/Cote1/EnfantHospitali";
import DetailEnfantHospitali from "./Compenent/Cote1/DetailEnfantHospitali";

import NavBars2 from "./Compenent/Cote2/NavBars2";
import Acceuile2 from "./Compenent/Cote2/Acceuile2";
import SlideNavBars2 from "./Compenent/Cote2/SlideNavBars2";
import Medica2 from "./Compenent/Cote2/Medica2";
import AjoutMedica2 from "./Compenent/Cote2/AjoutMedica2";
import ModifierMedic2 from "./Compenent/Cote2/ModifierMedic2";
import MedicamentUsage2 from "./Compenent/Cote2/MedicamentUsage2";
import Consult2 from "./Compenent/Cote2/Consult2";
import { useThemes } from "./UserContext/UserContext";
import Enfants2 from "./Compenent/Cote2/Enfants2";
import Vaccination2 from "./Compenent/Cote2/Vaccination2";
import EnfantHospitali2 from "./Compenent/Cote2/EnfantHospitali2";
import DetailEnfantHospitali2 from "./Compenent/Cote2/DetailEnfantHospitali2";
import EnfantConsultation2 from "./Compenent/Cote2/EnfantConsultation2";
import DetailEnfants2 from "./Compenent/Cote2/DetailEnfants2";
import Enfants2Ajout from "./Compenent/Cote2/Enfants2Ajout";
import ModifierEnfants2 from "./Compenent/Cote2/ModifierEnfants2";
import ModifierEnfants2Parent from "./Compenent/Cote2/ModifierEnfants2Parent";
import ListeMedicamentConsulte from "./Compenent/Cote2/ListeMedicamentConsulte";
import MedicamentCart from "./Compenent/Cote2/MedicamentCart";
import EnfantVaccination2 from "./Compenent/Cote2/EnfantVaccination2";
import ListeMedicamentVaccination from "./Compenent/Cote2/ListeMedicamentVaccination";
import MedicamentCartVaccin from "./Compenent/Cote2/MedicamentCartVaccin";
import DetailConsultant2 from "./Compenent/Cote2/DetailConsultant2";
import ModifConsult2 from "./Compenent/Cote2/ModifConsult2";
import DetailVaccination2 from "./Compenent/Cote2/DetailVaccination2";
import DetailMedicementused from "./Compenent/Cote2/DetailMedicementused";
import EnfantHospitalisation from "./Compenent/Cote2/EnfantHospitalisation";
import MakeOspitalisation from "./Compenent/Cote2/MakeOspitalisation";

function App() {
  const { mobile } = useThemes();
  const [autre, SetAutre] = useState(false);

  return autre ? (
    <div className="flex">
      <SlideNavBars />
      <div className={` ${mobile ? "w-[100%]" : "w-[85%]"}`}>
        <div>
          <NavBars />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Acceuile />} />

            <Route path="/med" element={<Medica />} />
            <Route path="/med/ajout" element={<AjoutMedica />} />
            <Route path="/med/modif/:id" element={<ModifierMedic />} />

            <Route path="/pers" element={<Personne />} />
            <Route path="/pers/ajour" element={<AjouterPersone />} />
            <Route path="/pers/modif/:id" element={<ModifiePersone />} />

            <Route path="/enf" element={<Enfants />} />
            <Route path="/enf/detail/:id" element={<DetailEnfants />} />

            <Route path="/userMed" element={<MedicamentUsage />} />
            <Route
              path="/userMed/detail/:id"
              element={<DetailMedicementused />}
            />

            <Route path="/consult" element={<Consult />} />
            <Route path="/consult/detail/:id" element={<DetailConsultant />} />

            <Route path="/Vaccination" element={<Vaccination />} />
            <Route
              path="/Vaccination/detail/:id"
              element={<DetailVaccination2 />}
            />

            <Route path="/hopit" element={<EnfantHospitali />} />
            <Route
              path="/hopit/detail/:id"
              element={<DetailEnfantHospitali />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <SlideNavBars2 />
      <div className="w-[85%]">
        <div>
          <NavBars2 />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Acceuile2 />} />

            <Route path="/med" element={<Medica2 />} />
            <Route path="/med/ajout" element={<AjoutMedica2 />} />
            <Route path="/med/modif/:id" element={<ModifierMedic2 />} />

            <Route path="/enf" element={<Enfants2 />} />
            <Route path="/enf/ajout" element={<Enfants2Ajout />} />
            <Route path="/enf/detail/:id" element={<DetailEnfants2 />} />
            <Route path="/enf/modifier/:id" element={<ModifierEnfants2 />} />
            <Route
              path="/enf/modifierparent/:id/:enfId"
              element={<ModifierEnfants2Parent />}
            />

            <Route path="/userMed" element={<MedicamentUsage2 />} />
            <Route
              path="/userMed/detail/:id"
              element={<DetailMedicementused />}
            />

            <Route path="/consult" element={<Consult2 />} />
            <Route path="/consult/enfant" element={<EnfantConsultation2 />} />
            <Route
              path="/consult/enfConsult/:id"
              element={<ListeMedicamentConsulte />}
            />
            <Route path="/consult/detail/:id" element={<DetailConsultant2 />} />
            <Route path="/consult/medCart/:id" element={<MedicamentCart />} />
            <Route path="/consult/modifier/:id" element={<ModifConsult2 />} />

            <Route path="/Vaccination" element={<Vaccination2 />} />
            <Route
              path="/Vaccination/enfant"
              element={<EnfantVaccination2 />}
            />
            <Route
              path="/Vaccination/enfVaccin/:id"
              element={<ListeMedicamentVaccination />}
            />
            <Route
              path="/Vaccination/medCart/:id"
              element={<MedicamentCartVaccin />}
            />
            <Route
              path="/Vaccination/detail/:id"
              element={<DetailVaccination2 />}
            />

            <Route path="/hopit" element={<EnfantHospitali2 />} />
            <Route path="/hopit/enfant" element={<EnfantHospitalisation />} />
            <Route
              path="/hopit/enfhopit/:id"
              element={<MakeOspitalisation />}
            />
            <Route
              path="/hopit/detail/:id"
              element={<DetailEnfantHospitali2 />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
