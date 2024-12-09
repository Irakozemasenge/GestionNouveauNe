/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Popover, Whisper } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Enfants2Ajout() {
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

  const [parent, setparent] = useState([
    {
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
      email: "",
      relation: "",
    },
  ]);

  const addBloc = () => {
    setparent([
      ...parent,
      {
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        email: "",
        relation: "",
      },
    ]);
  };

  const removeBloc = (index) => {
    const newparent = [...parent];
    newparent.splice(index, 1);
    setparent(newparent);
  };

  const inputRefs = useRef([]);
  if (inputRefs.current.length !== parent.length) {
    inputRefs.current = Array(parent.length)
      .fill({})
      .map((_, index) => ({
        nom: React.createRef(null),
        prenom: React.createRef(null),
        adresse: React.createRef(null),
        telephone: React.createRef(null),
        email: React.createRef(null),
        relation: React.createRef(null),
      }));
  }

  const handleInputChange = (index, field, value) => {
    const newparent = [...parent];
    newparent[index][field] = value;
    setparent(newparent);
    if (value && inputRefs.current[index][field].current) {
      inputRefs.current[index][field].current.classList.remove(
        "animate__animated",
        "animate__shakeX",
        "border-2",
        "border-red-500"
      );
    }
  };

  const animateAndScrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.classList.add(
        "animate__animated",
        "animate__shakeX",
        "border-2",
        "border-red-500",
        "outline-none"
      );
      setTimeout(() => {
        ref.current.classList.remove(
          "animate__animated",
          "animate__shakeX",
          "border-2",
          "border-red-500",
          "outline-none"
        );
      }, 5000);
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
  };

  const valiprenomBloc = (bloc, index) => {
    const requiredFields = [
      "nom",
      "prenom",
      "adresse",
      "telephone",
      "email",
      "relation",
    ];
    for (const field of requiredFields) {
      if (!bloc[field]) {
        toast.warning(
          <div>
            <strong>
              {field === "nom"
                ? "Nom du parent"
                : field === "prenom"
                ? "Prénom du parent"
                : field === "adresse"
                ? "adressee du parent"
                : field === "telephone"
                ? "Téléphone du parent"
                : field === "email"
                ? "Email du parent"
                : field === "relation"
                ? "Relation de parent"
                : null}
            </strong>{" "}
            est obligatoire au {index + 1} parent.
          </div>
        );
        if (inputRefs.current[index][field].current) {
          inputRefs.current[index][field].current.classList.add(
            "animate__animated",
            "animate__shakeX",
            "border-2",
            "border-red-500",
            "outline-none"
          );
          setTimeout(() => {
            inputRefs.current[index][field].current.classList.remove(
              "animate__animated",
              "animate__shakeX",
              "border-2",
              "border-red-500",
              "outline-none"
            );
          }, 3000);
          inputRefs.current[index][field].current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          inputRefs.current[index][field].current.focus();
          return false;
        }
      }
    }

    if (!isValidEmail(bloc.email)) {
      toast.warning(
        <div>
          <strong>Email du parent</strong> au {index + 1} parent n'est pas
          valide.
        </div>
      );
      animateAndScrollToRef(inputRefs.current[index].email);
      return false;
    }
    return true;
  };

  const toRoman = (num) => {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
      "XVI",
      "XVII",
      "XVIII",
      "XIX",
      "XX",
      "XXI",
      "XXII",
      "XXIII",
      "XXIV",
      "XXV",
      "XXVI",
      "XXVII",
      "XXVIII",
      "XXIX",
      "XXX",
    ];
    return romanNumerals[num - 1] || num.toString();
  };

  const parents = parent.map((person) => ({
    nom: person.nom,
    prenom: person.prenom,
    adresse: person.adresse,
    telephone: person.telephone,
    email: person.email,
    relation: person.relation,
  }));
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
    parents: parents,
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
      toast.warning("La Date de naissance est obligatoire !!");
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
      toast.warning("Le rhesus  d'enfant est obligatoire !!");
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
    } else if (parent) {
      for (let index = 0; index < parent.length; index++) {
        if (!valiprenomBloc(parent[index], index)) {
          return false;
        }
      }
      axios
        .post(
          "https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/Add",
          dataAll
        )
        .then((response) => {
          toast.success("L'insertion a été faite avec succès");
          navigate("/enf");
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
          <Link to="/enf">Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">
            Enregistre un nouveaux enfant{" "}
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
                  Poids de naissance(en gramme)
                </label>
                <input
                  type="number"
                  value={poids_naissance}
                  onChange={(e) => Getpoids_naissance(e.target.value)}
                  placeholder="Poids de naissance en grammes"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefpoids_naissance}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Taille de naissance(en cm)
                </label>
                <input
                  type="number"
                  value={taille_naissance}
                  onChange={(e) => Gettaille_naissance(e.target.value)}
                  placeholder="Taille de naissance en cm"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenReftaille_naissance}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Groupe sanguin
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
                  rhesus
                </label>
                <select
                  value={rhesus}
                  onChange={(e) => Getrhesus(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefrhesus}
                >
                  <option hidden value="">
                    Selectionner le rhesus{" "}
                  </option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  observations
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
            <div>
              <div className="block mt-5 font-serif text-gray-500 first-letter:uppercase tracking-wide text-xl mb-1">
                Parents
              </div>
              <div className="rounded-lg p-2 relative flex flex-col gap-2 w-full sm:p-4">
                {parent.map((bloc, index) => (
                  <div
                    key={index}
                    className="justify-center w-full rounded-xl p-1 sm:p-4 mb-10 border-[1px] flex flex-col"
                  >
                    <div className="flex flex-col">
                      <label className="block mt-2 font-serif text-gray-500 first-letter:uppercase tracking-wide text-lg mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={bloc.nom}
                        onInput={(e) =>
                          handleInputChange(index, "nom", e.target.value)
                        }
                        ref={inputRefs.current[index].nom}
                        placeholder="Nom de parents"
                        className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block mt-2 font-serif text-gray-500 first-letter:uppercase tracking-wide text-lg mb-1">
                        Pérnom
                      </label>
                      <input
                        type="text"
                        value={bloc.prenom}
                        onInput={(e) =>
                          handleInputChange(index, "prenom", e.target.value)
                        }
                        ref={inputRefs.current[index].prenom}
                        placeholder="Pérnom de parents"
                        className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                        adressee
                      </label>
                      <textarea
                        value={bloc.adresse}
                        onInput={(e) =>
                          handleInputChange(index, "adresse", e.target.value)
                        }
                        ref={inputRefs.current[index].adresse}
                        type="text"
                        placeholder="adresse..."
                        className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      ></textarea>
                    </div>

                    <div className="flex flex-col">
                      <label className="block mt-2 font-serif text-gray-500 first-letter:uppercase tracking-wide text-lg mb-1">
                        Téléphone
                      </label>
                      <input
                        type="text"
                        value={bloc.telephone}
                        onInput={(e) =>
                          handleInputChange(index, "telephone", e.target.value)
                        }
                        ref={inputRefs.current[index].telephone}
                        placeholder="Téléphone de parents"
                        className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block mt-2 font-serif text-gray-500 first-letter:uppercase tracking-wide text-lg mb-1">
                        Email
                      </label>
                      <input
                        value={bloc.email}
                        onInput={(e) =>
                          handleInputChange(index, "email", e.target.value)
                        }
                        ref={inputRefs.current[index].email}
                        type="text"
                        placeholder="Email de parents"
                        className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                        Relation
                      </label>
                      <select
                        value={bloc.relation}
                        onChange={(e) =>
                          handleInputChange(index, "relation", e.target.value)
                        }
                        ref={inputRefs.current[index].relation}
                        className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                      >
                        <option hidden value="">
                          Selection la relation{" "}
                        </option>
                        <option value="Père">Père</option>
                        <option value="Mère">Mère</option>
                        <option value="Tuteur">Tuteur</option>
                      </select>
                    </div>
                    <div className="w-full flex justify-end items-center">
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 px-1 max-sm:text-xs py-2"
                          onClick={() => removeBloc(index)}
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full px-10 mb-10">
              {parent.length < 3 && (
                <div className="w-max  p-2 ">
                  <Whisper
                    trigger="hover"
                    placement="auto"
                    speaker={
                      <Popover className="text-nowrap">
                        Ajouter un autre parent
                      </Popover>
                    }
                  >
                    <div
                      className="text-white bg-[#5dca32] cursor-pointer rounded-md p-2"
                      onClick={addBloc}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-square-dotted"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                      </svg>
                    </div>
                  </Whisper>
                </div>
              )}
              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className={`text-white bg-green-500  rounded-md px-4 py-2`}
                >
                  Enregistre
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Enfants2Ajout;
