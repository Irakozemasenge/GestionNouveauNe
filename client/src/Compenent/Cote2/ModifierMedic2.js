/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Popover, Whisper } from "rsuite";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { decryptData } from "../../encryptionModule";

function ModifierMedic2() {
  const [nom_medicament, Getnom_medicament] = useState("");
  const inputRefsnom_medicament = useRef(null);

  const [quantite, Getquantite] = useState("");
  const elemenRefquantite = useRef(null);

  const [date_peremption, Getdate_peremption] = useState("");
  const elemenRefdate_peremption = useRef(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const medicanentId = decryptData(id);

  useEffect(() => {
    axios
      .get(
        `https://gestionnouveaune.abahs-jobconnect.online/medicanent/stockMedicaments/${medicanentId}`
      )
      .then((response) => {
        Getquantite(response.data.quantite);
        Getnom_medicament(response.data.nom_medicament);
        // Formater la date pour qu'elle soit compatible avec l'input type="date"
        if (response.data.date_peremption) {
          Getdate_peremption(formatDate(response.data.date_peremption));
        }
      })
      .catch((error) => {
        console.error("Error fetching medicanents:", error);
      });
  }, [medicanentId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom_medicament.trim() == "") {
      toast.warning("Le nom_medicament est obligatoire !!");
      inputRefsnom_medicament.current &&
        inputRefsnom_medicament.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsnom_medicament.current &&
        inputRefsnom_medicament.current.focus();
      return false;
    } else if (quantite.toString().trim() == "") {
      toast.warning("Le prénom_medicament est obligatoire !!");
      elemenRefquantite.current &&
        elemenRefquantite.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefquantite.current && elemenRefquantite.current.focus();
      return false;
    } else if (date_peremption == "") {
      toast.warning("Le téléphone est obligatoire !!");
      elemenRefdate_peremption.current &&
        elemenRefdate_peremption.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefdate_peremption.current &&
        elemenRefdate_peremption.current.focus();
      return false;
    } else {
      const data = [
        {
          nom_medicament: nom_medicament,
          quantite: quantite,
          date_peremption: date_peremption,
        },
      ];

      axios
        .put(
          `https://gestionnouveaune.abahs-jobconnect.online/medicanent/stockMedicaments/${medicanentId}`,
          data
        )
        .then((response) => {
          toast.success("Mis a jour a été faite avec succès");
          navigate("/med");
          console.log(response.data);
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
    }
  };
  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full mt-2 ml-2 justify-start">
          <Link to="/pers">Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">
            Modifier médicament{" "}
          </div>
          <div className="p-2 relative flex flex-col gap-2 w-full sm:p-4">
            <div className="justify-center w-full  p-1 sm:p-2 mb-10  flex flex-col">
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  nom du médicament
                </label>
                <input
                  type="text"
                  value={nom_medicament}
                  onChange={(e) => Getnom_medicament(e.target.value)}
                  placeholder="Le  nom_medicament de médicament"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsnom_medicament}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Quantite du médicament
                </label>
                <input
                  type="text"
                  value={quantite}
                  onChange={(e) => Getquantite(e.target.value)}
                  placeholder="Le  quantite  du médicament"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefquantite}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Date d'expiration
                </label>
                <input
                  type="date"
                  value={date_peremption}
                  placeholder="Le téléphone"
                  onChange={(e) => Getdate_peremption(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefdate_peremption}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full px-10 mb-10">
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                className={`text-white bg-green-500 rounded-md px-4 py-2`}
              >
                Modifier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifierMedic2;
