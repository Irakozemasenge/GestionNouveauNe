/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Popover, Whisper } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function AjoutMedica2() {
  const [mobile11, SetMobile11] = useState(window.innerWidth < 501);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      SetMobile11(window.innerWidth < 501);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [mobile, SetMobile] = useState(window.innerWidth <= 640);
  const [boutLoading, setBoutLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      SetMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [personn, setpersonn] = useState([
    { nom: "", quantite: "", dateExpire: "" },
  ]);

  const addBloc = () => {
    setpersonn([...personn, { nom: "", quantite: "", dateExpire: "" }]);
  };

  const removeBloc = (index) => {
    const newpersonn = [...personn];
    newpersonn.splice(index, 1);
    setpersonn(newpersonn);
  };

  const inputRefs = useRef([]);
  if (inputRefs.current.length !== personn.length) {
    inputRefs.current = Array(personn.length)
      .fill({})
      .map((_, index) => ({
        nom: React.createRef(null),
        quantite: React.createRef(null),
        dateExpire: React.createRef(null),
      }));
  }

  const handleInputChange = (index, field, value, isPhotos) => {
    const newpersonn = [...personn];
    newpersonn[index][field] = value;
    if (isPhotos) {
      newpersonn[index].email = value;
    }
    setpersonn(newpersonn);
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

  const validateBloc = (bloc, index) => {
    const requiredFields = ["nom", "quantite", "dateExpire"];
    for (const field of requiredFields) {
      if (!bloc[field]) {
        toast.warning(
          <div>
            <strong>
              {field === "nom"
                ? "Nom du médicament"
                : field === "quantite"
                ? "quantite"
                : field === "dateExpire"
                ? "date d'expiration"
                : null}
            </strong>{" "}
            est obligatoire au {index + 1} utilisateur.
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

    // Validation pour éviter de soumettre deux personn de même information
    const isDuplique = personn.some(
      (b, i) => i !== index && b.nom === bloc.nom
    );
    if (isDuplique) {
      const duplicateBlockIndex = personn.findIndex(
        (b, i) => i !== index && b.nom === bloc.nom
      );
      const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
      toast.warning(
        <div key="1">
          Évitez la redondance, le nom{" "}
          <span className="font-bold">{bloc.nom}</span> de la bloc{" "}
          <span className="font-bold">{toRoman(index + 1)}</span> et la{" "}
          <span className="font-bold">{duplicateBlockNumber}</span> ont le même
          nom de pharmacie.
        </div>
      );
      animateAndScrollToRef(inputRefs.current[index].nom);
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

  const data = personn.map((person) => ({
    nom_medicament: person.nom,
    quantite: person.quantite,
    date_peremption: person.dateExpire,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let index = 0; index < personn.length; index++) {
      if (!validateBloc(personn[index], index)) {
        return false;
      }
    }

    axios
      .post(
        "https://gestionnouveaune.abahs-jobconnect.online/medicanent/stockMedicaments",
        data
      )
      .then((response) => {
        toast.success("L'insertion a été faite avec succès");
        navigate("/med");
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
          <Link to="/med">Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-10">
            Ajouter une nouvelle médicament{" "}
          </div>
          <div className="rounded-lg p-2 relative flex flex-col gap-2 w-full sm:p-4">
            {personn.map((bloc, index) => (
              <div
                key={index}
                className="justify-center w-full rounded-xl p-1 sm:p-2 mb-10 border-[1px] flex flex-col"
              >
                <div className="w-full">
                  <div className="h-max w-full">
                    <div className="px-3 w-full">
                      <div className="w-full flex items_center justify-between">
                        <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                          {toRoman(index + 1)}. médicament
                        </label>
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
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`nom_${index}`}
                    className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1"
                  >
                    Nom du médicament
                  </label>
                  <input
                    type="text"
                    id={`nom_${index}`}
                    value={bloc.nom}
                    onChange={(e) =>
                      handleInputChange(index, "nom", e.target.value)
                    }
                    placeholder="Le  nom de personne"
                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                    ref={inputRefs.current[index].nom}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`nom_${index}`}
                    className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1"
                  >
                    Quantite du médicament
                  </label>
                  <input
                    type="number"
                    min={0}
                    id={`nom_${index}`}
                    value={bloc.quantite}
                    onChange={(e) =>
                      handleInputChange(index, "quantite", e.target.value)
                    }
                    placeholder="Le  quantite  du personne"
                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                    ref={inputRefs.current[index].quantite}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`role_${index}`}
                    className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1"
                  >
                    Date d'expiration
                  </label>
                  <input
                    type="date"
                    value={bloc.dateExpire}
                    placeholder="Le téléphone"
                    onChange={(e) =>
                      handleInputChange(index, "dateExpire", e.target.value)
                    }
                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                    ref={inputRefs.current[index].dateExpire}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full px-10 mb-10">
            <div className="w-max  p-2 ">
              <Whisper
                trigger="hover"
                placement="auto"
                speaker={
                  <Popover className="text-nowrap">
                    Ajouter un autre médicament
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
            <div className="w-full flex justify-end mt-4">
              <button
                disabled={boutLoading}
                type="submit"
                className={`text-white bg-green-500 ${
                  boutLoading ? "opacity-55" : "opacity-100"
                } rounded-md px-4 py-2`}
              >
                Enregistre
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjoutMedica2;
