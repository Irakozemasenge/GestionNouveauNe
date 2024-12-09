/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptData } from "../../encryptionModule";
import axios from "axios";

function MakeOspitalisation() {
  const { id } = useParams();
  const enfantId = decryptData(id);
  const navigate = useNavigate();
  const [raison_admission, Getraison_admission] = useState("");
  const elemenRefraison_admission = useRef(null);

  const [traitement, Gettraitement] = useState("");
  const elemenReftraitement = useRef(null);

  const [date_admission, Getdate_admission] = useState("");
  const elemenRefdate_admission = useRef(null);

  const [date_sortie, Getdate_sortie] = useState("");
  const elemenRefdate_sortie = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (raison_admission.trim() === "") {
      toast.warning("Le raison d'admission est obligatoire !!");
      elemenRefraison_admission.current &&
        elemenRefraison_admission.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefraison_admission.current &&
        elemenRefraison_admission.current.focus();
      return false;
    }

    if (traitement.trim() === "") {
      toast.warning("Le traitement est obligatoire !!");
      elemenReftraitement.current &&
        elemenReftraitement.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenReftraitement.current && elemenReftraitement.current.focus();
      return false;
    }
    if (date_admission.trim() === "") {
      toast.warning("Le date d'admission est obligatoire !!");
      elemenRefdate_admission.current &&
        elemenRefdate_admission.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefdate_admission.current &&
        elemenRefdate_admission.current.focus();
      return false;
    }
    if (date_sortie.trim() === "") {
      toast.warning("Le date de sortie est obligatoire !!");
      elemenRefdate_sortie.current &&
        elemenRefdate_sortie.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefdate_sortie.current && elemenRefdate_sortie.current.focus();
      return false;
    }

    const data = {
      NouveauNeId: enfantId,
      PersonnelId: 1,
      date_admission: date_admission,
      date_sortie: date_sortie,
      traitement: traitement,
      raison_admission: raison_admission,
    };

    axios
      .post(
        "https://gestionnouveaune.abahs-jobconnect.online/hospitalisation/Add",
        data
      )
      .then((response) => {
        toast.success("L'insertion a été faite avec succès");
        navigate("/hopit");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(`Erreur : ${error.response.data.message}`);
        } else {
          toast.error("Une erreur est survenue lors de l'envoi des données");
        }
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden   overflow-y-auto  flex-col">
        <div className="flex w-full mt-2 ml-2 justify-start">
          <Link to="/hopit/enfant">Retour</Link>
        </div>
        <div className=" mx-5 text-2xl  mb-4 font-bold  text-left mt-5">
          Liste des médicament à utiliser
        </div>
        <div className="h-max">
          <div className="w-full pb-5 overflow-hidden px-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mb-5 items-center"
            >
              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Raison d'admission
                </label>
                <input
                  type="text"
                  value={raison_admission}
                  onChange={(e) => Getraison_admission(e.target.value)}
                  placeholder="Raison d'admission..."
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefraison_admission}
                />
              </div>

              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Traitement
                </label>
                <input
                  type="text"
                  value={traitement}
                  onChange={(e) => Gettraitement(e.target.value)}
                  placeholder="Traitement..."
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenReftraitement}
                />
              </div>
              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Date d'admission
                </label>
                <input
                  type="date"
                  value={date_admission}
                  onChange={(e) => Getdate_admission(e.target.value)}
                  placeholder="date d'admission..."
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefdate_admission}
                />
              </div>

              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Date de sortie
                </label>
                <input
                  type="date"
                  value={date_sortie}
                  onChange={(e) => Getdate_sortie(e.target.value)}
                  placeholder="date de sortie..."
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefdate_sortie}
                />
              </div>
              <div className="flex justify-end w-full mt-5 items-center">
                <button className="border border-[#5dca32] rounded-md text-[#5dca32] px-4 py-2 font-bold">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeOspitalisation;
