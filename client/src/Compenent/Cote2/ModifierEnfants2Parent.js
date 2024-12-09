/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptData } from "../../encryptionModule";
import axios from "axios";

function ModifierEnfants2Parent() {
  const navigate = useNavigate();
  const [nom, Getnom] = useState("");
  const inputRefsnom = useRef(null);

  const [prenom, Getprenom] = useState("");
  const inputRefsprenom = useRef(null);

  const [telephone, Gettelephone] = useState("");
  const elemenReftelephone = useRef(null);

  const [email, Getemail] = useState("");
  const elemenRefemail = useRef(null);

  const [relation, Getrelation] = useState("");
  const elemenRefrelation = useRef(null);

  const [adresse, Getadresse] = useState("");
  const elemenRefadresse = useRef(null);
  const { id, enfId } = useParams();
  const parentId = decryptData(id);
  useEffect(() => {
    axios
      .get(
        `https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/OneParentById/${parentId}`
      )
      .then((response) => {
        Getnom(response.data.nom);
        Getprenom(response.data.prenom);
        Gettelephone(response.data.telephone);
        Getemail(response.data.email);
        console.log(response.data);
        Getrelation(response.data.relation);
        Getadresse(response.data.adresse);
      })
      .catch((error) => {
        console.error("Error fetching parents:", error);
      });
  }, [parentId]);

  const dataAll = {
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    telephone: telephone,
    email: email,
    relation: relation,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim() == "") {
      toast.warning("Le Nom de parent est obligatoire !!");
      inputRefsnom.current &&
        inputRefsnom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsnom.current && inputRefsnom.current.focus();
      return false;
    } else if (prenom.trim() == "") {
      toast.warning("Le prénom de parent est obligatoire !!");
      inputRefsprenom.current &&
        inputRefsprenom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsprenom.current && inputRefsprenom.current.focus();
      return false;
    } else if (adresse.trim() === "") {
      toast.warning("L'adresse de parent est obligatoire !!");
      elemenRefadresse.current &&
        elemenRefadresse.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefadresse.current && elemenRefadresse.current.focus();
      return false;
    } else if (telephone.trim() === "") {
      toast.warning("Le telephone de parent est obligatoire !!");
      elemenReftelephone.current &&
        elemenReftelephone.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenReftelephone.current && elemenReftelephone.current.focus();
      return false;
    } else if (email.trim() === "") {
      toast.warning("La email de parent est obligatoire !!");
      elemenRefemail.current &&
        elemenRefemail.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefemail.current && elemenRefemail.current.focus();
      return false;
    } else if (relation === "") {
      toast.warning("Le relation  de parent est obligatoire !!");
      elemenRefrelation.current &&
        elemenRefrelation.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefrelation.current && elemenRefrelation.current.focus();
      return false;
    }

    axios
      .put(
        `https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/parentOneById/${parentId}`,
        dataAll
      )
      .then((response) => {
        toast.success("La modification a été faite avec succès");
        navigate(`/enf/detail/${enfId}`);
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
          <Link to={`/enf/detail/${enfId}`}>Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">
            Modifier parent{" "}
          </div>
          <div className="p-2 relative flex flex-col gap-2 w-full sm:p-4">
            <div className="justify-center w-full  p-1 sm:p-2 mb-10  flex flex-col">
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Nom du parent
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => Getnom(e.target.value)}
                  placeholder="Nom du parent"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsnom}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Prenom du parent
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => Getprenom(e.target.value)}
                  placeholder="Prenom du parent"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsprenom}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  adresse du parent
                </label>
                <textarea
                  type="text"
                  value={adresse}
                  onChange={(e) => Getadresse(e.target.value)}
                  placeholder="adresse du parent  du parent... "
                  className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefadresse}
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Téléphones du parent
                </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => Gettelephone(e.target.value)}
                  placeholder="Telephone  du parent"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenReftelephone}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Email du parent
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => Getemail(e.target.value)}
                  placeholder="Email  du parent"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefemail}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  relation
                </label>
                <select
                  value={relation}
                  onChange={(e) => Getrelation(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefrelation}
                >
                  <option hidden value="">
                    Selection la relation{" "}
                  </option>
                  <option value="Père">Père</option>
                  <option value="Mère">Mère</option>
                  <option value="Tuteur">Tuteur</option>
                </select>
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

export default ModifierEnfants2Parent;
