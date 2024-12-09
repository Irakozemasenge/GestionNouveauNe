/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Popover, Whisper } from "rsuite";
import { decryptData } from "../../encryptionModule";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
function DetailEnfants() {
  const [mobile, GetMobile] = useState(window.innerWidth < 772);
  const [mobile3, SetMobile3] = useState(window.innerWidth < 342);
  useEffect(() => {
    const HundleSize = () => {
      GetMobile(window.innerWidth < 772);
      SetMobile3(window.innerWidth < 342);
    };

    window.addEventListener("resize", HundleSize);
    return () => window.removeEventListener("resize", HundleSize);
  }, []);

  const [nouveauNe, getnouveauNe] = useState({});
  const { id } = useParams();
  const nouveauNeId = decryptData(id);
  useEffect(() => {
    axios
      .get(
        `https://gestionnouveaune.abahs-jobconnect.online/nouveauNe/OneById/${nouveauNeId}`
      )
      .then((response) => {
        getnouveauNe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nouveauNes:", error);
      });
  }, [nouveauNeId]);
  const formatDate = (date) => {
    return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
  };

  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden pb-5    overflow-y-auto  flex-col">
        <Whisper
          trigger="hover"
          placement="auto"
          speaker={<Popover className=" text-nowrap">Retour</Popover>}
        >
          <Link to="/enf" className="m-4  w-max">
            Retour
          </Link>
        </Whisper>
        <div className="h-max">
          <div className="w-full pl-6">
            <div className="w-full  pb-3">
              <div className="text-[20px] mb-5">
                Détail sur l'enfants{" "}
                <span className="font-bold pl-2">
                  {nouveauNe && nouveauNe.nom} {nouveauNe && nouveauNe.prenom}
                </span>{" "}
              </div>

              {nouveauNe && (
                <div>
                  <div className="border border-[#5dca32] rounded-xl p-4 m-4 w-[95%]">
                    <div className="text-lg font-bold">
                      Information personnel
                    </div>
                    <div>
                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Nom d'enfant{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.nom}
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Prénom d'enfant
                          <span className="font-bold pl-2">
                            {nouveauNe.prenom}
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Date de naissance{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.date_naissance &&
                              formatDate(nouveauNe.date_naissance)}
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Sexe{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.sexe}
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Poids de naissance{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.poids_naissance} g
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Taille de naissance{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.taille_naissance} cm
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Grpupe sanguin{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.groupe_sanguin}
                          </span>
                        </div>
                      </div>

                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Rhesus sanguin{" "}
                          <span className="font-bold pl-2">
                            {nouveauNe.rhesus}
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-4 items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Observation
                          <div className="font-bold pl-2 whitespace-break-spaces">
                            {nouveauNe.observations}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#5dca32"
                          class="bi mr-2 bi-arrow-right-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <div>
                          Date d'inscription
                          <span className="font-bold pl-2 whitespace-break-spaces">
                            {nouveauNe.createdAt &&
                              formatDate(nouveauNe.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {nouveauNe &&
                    nouveauNe.Parents &&
                    nouveauNe.Parents.length > 0 &&
                    nouveauNe.Parents.map((data) => {
                      return (
                        <div className="border border-[#5dca32] rounded-xl p-4 m-4 w-[95%]">
                          <div className="text-lg font-bold">
                            Information parental
                          </div>
                          <div>
                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Nom du parent{" "}
                                <span className="font-bold pl-2">
                                  {data.nom}
                                </span>
                              </div>
                            </div>
                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Prénom du parent
                                <span className="font-bold pl-2">
                                  {data.prenom}
                                </span>
                              </div>
                            </div>

                            <div className="flex mt-4 items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Adresse du parent
                                <div className="font-bold pl-2 whitespace-break-spaces">
                                  {data.adresse}
                                </div>
                              </div>
                            </div>
                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Téléphone du parent{" "}
                                <span className="font-bold pl-2">
                                  {data.telephone}
                                </span>
                              </div>
                            </div>

                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Email du parent{" "}
                                <span className="font-bold pl-2">
                                  {data.email}
                                </span>
                              </div>
                            </div>

                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Relation du parent
                                <span className="font-bold pl-2">
                                  {data.NouveauNeParent &&
                                    data.NouveauNeParent.relation}
                                </span>
                              </div>
                            </div>

                            <div className="flex mt-4 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5dca32"
                                class="bi mr-2 bi-arrow-right-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                              <div>
                                Date d'inscription
                                <span className="font-bold pl-2 whitespace-break-spaces">
                                  {data.createdAt && formatDate(data.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEnfants;
