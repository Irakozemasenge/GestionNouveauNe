/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptData } from "../../encryptionModule";
import axios from "axios";

function ModifierEnfants2() {
  const navigate = useNavigate();
  const [nom, Getnom] = useState("");
  const inputRefsnom = useRef(null);

  const [prenom, Getprenom] = useState("");
  const inputRefsprenom = useRef(null);

  const [date_naissance, Getdate_naissance] = useState("");
  const elemenRefdate_naissance = useRef(null);

  const [sexe, Getsexe] = useState("");
  const elemenRefsexe = useRef(null);

  const [poids_naissance, Getpoids_naissance] = useState("");
  const elemenRefpoids_naissance = useRef(null);

  const [taille_naissance, Gettaille_naissance] = useState("");
  const elemenReftaille_naissance = useRef(null);

  const [groupe_sanguin, Getgroupe_sanguin] = useState("");
  const elemenRefgroupe_sanguin = useRef(null);

  const [rhesus, Getrhesus] = useState("");
  const elemenRefrhesus = useRef(null);

  const [observations, Getobservations] = useState("");
  const elemenRefobservations = useRef(null);
  const { id } = useParams();
  const nouveauNeId = decryptData(id);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };
  useEffect(() => {
    axios
      .get(
        `https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/OneById/${nouveauNeId}`
      )
      .then((response) => {
        Getnom(response.data.nom);
        Getprenom(response.data.prenom);
        // Formater la date_naissance pour qu'elle soit compatible avec l'input type="date"
        if (response.data.date_naissance) {
          Getdate_naissance(formatDate(response.data.date_naissance));
        }

        Getsexe(response.data.sexe);
        Getpoids_naissance(response.data.poids_naissance);
        Gettaille_naissance(response.data.taille_naissance);
        Getgroupe_sanguin(response.data.groupe_sanguin);
        Getrhesus(response.data.rhesus);
        Getobservations(response.data.observations);
      })
      .catch((error) => {
        console.error("Error fetching nouveauNes:", error);
      });
  }, [nouveauNeId]);
  const dataAll = {
    nom: nom,
    prenom: prenom,
    date_naissance: date_naissance,
    sexe: sexe,
    poids_naissance: poids_naissance,
    taille_naissance: taille_naissance,
    groupe_sanguin: groupe_sanguin,
    rhesus: rhesus,
    observations: observations,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim() == "") {
      toast.warning("Le Nom d'enfant est obligatoire !!");
      inputRefsnom.current &&
        inputRefsnom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsnom.current && inputRefsnom.current.focus();
      return false;
    } else if (prenom.trim() == "") {
      toast.warning("Le prénom d'enfant est obligatoire !!");
      inputRefsprenom.current &&
        inputRefsprenom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsprenom.current && inputRefsprenom.current.focus();
      return false;
    } else if (date_naissance === "") {
      toast.warning("La date de naissance est obligatoire !!");
      elemenRefdate_naissance.current &&
        elemenRefdate_naissance.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefdate_naissance.current &&
        elemenRefdate_naissance.current.focus();
      return false;
    } else if (sexe === "") {
      toast.warning("Le sexe d'enfant est obligatoire !!");
      elemenRefsexe.current &&
        elemenRefsexe.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefsexe.current && elemenRefsexe.current.focus();
      return false;
    } else if (poids_naissance.trim() === "") {
      toast.warning("Le poids_naissance d'enfant est obligatoire !!");
      elemenRefpoids_naissance.current &&
        elemenRefpoids_naissance.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefpoids_naissance.current &&
        elemenRefpoids_naissance.current.focus();
      return false;
    } else if (taille_naissance.trim() === "") {
      toast.warning("La taille_naissance d'enfant est obligatoire !!");
      elemenReftaille_naissance.current &&
        elemenReftaille_naissance.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenReftaille_naissance.current &&
        elemenReftaille_naissance.current.focus();
      return false;
    } else if (groupe_sanguin === "") {
      toast.warning("Le groupe sanquin d'enfant est obligatoire !!");
      elemenRefgroupe_sanguin.current &&
        elemenRefgroupe_sanguin.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefgroupe_sanguin.current &&
        elemenRefgroupe_sanguin.current.focus();
      return false;
    } else if (rhesus === "") {
      toast.warning("Le rrhesus  d'enfant est obligatoire !!");
      elemenRefrhesus.current &&
        elemenRefrhesus.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefrhesus.current && elemenRefrhesus.current.focus();
      return false;
    } else if (observations.trim() === "") {
      toast.warning("L'observations d'enfant est obligatoire !!");
      elemenRefobservations.current &&
        elemenRefobservations.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefobservations.current && elemenRefobservations.current.focus();
      return false;
    }

    axios
      .put(
        `https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/OneById/${nouveauNeId}`,
        dataAll
      )
      .then((response) => {
        toast.success("La modification a été faite avec succès");
        navigate(`/enf/detail/${id}`);
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
      <div className="flex w-full min-h-[82vh] overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full mt-2 ml-2 justify-start">
          <Link to={`/enf/detail/${id}`}>Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">
            Modifier enfant{" "}
          </div>
          <div className="p-2 relative flex flex-col gap-2 w-full sm:p-4">
            <div className="justify-center w-full  p-1 sm:p-2 mb-10  flex flex-col">
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Nom d'enfant
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => Getnom(e.target.value)}
                  placeholder="Nom d'enfant"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsnom}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Prenom d'enfant
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => Getprenom(e.target.value)}
                  placeholder="Prenom d'enfant"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsprenom}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={date_naissance}
                  onChange={(e) => Getdate_naissance(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefdate_naissance}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Sexe
                </label>
                <select
                  value={sexe}
                  onChange={(e) => Getsexe(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefsexe}
                >
                  <option hidden value="">
                    Selectionner le genre d'enfant
                  </option>
                  <option value="M">Garçon </option>
                  <option value="F">Fille</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Poids de naissance
                </label>
                <input
                  type="number"
                  value={poids_naissance}
                  onChange={(e) => Getpoids_naissance(e.target.value)}
                  placeholder="poids de naissance"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefpoids_naissance}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Poids de naissance
                </label>
                <input
                  type="number"
                  value={taille_naissance}
                  onChange={(e) => Gettaille_naissance(e.target.value)}
                  placeholder="poids de naissance"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenReftaille_naissance}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Groupe sanguinuin
                </label>
                <select
                  value={groupe_sanguin}
                  onChange={(e) => Getgroupe_sanguin(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefgroupe_sanguin}
                >
                  <option hidden value="">
                    Selectionner le groupe sanguin{" "}
                  </option>
                  <option value="A">A </option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Rrhesus
                </label>
                <select
                  value={rhesus}
                  onChange={(e) => Getrhesus(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefrhesus}
                >
                  <option hidden value="">
                    Selectionner le rrhesus{" "}
                  </option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Observations
                </label>
                <textarea
                  type="text"
                  value={observations}
                  onChange={(e) => Getobservations(e.target.value)}
                  placeholder="observations..."
                  className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefobservations}
                ></textarea>
              </div>
            </div>

            <div className="flex w-full px-10 mb-10">
              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className={`text-white bg-green-500  rounded-md px-4 py-2`}
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifierEnfants2;
