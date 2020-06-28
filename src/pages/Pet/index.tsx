import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { PET } from "../../redux/actions/Pet";

import Header from "../../componenets/Header";

import "./style.css";

const Pet = () => {
  const [pets, setPets] = useState<PET | null>(null);
  const petState: PET[] = useSelector((state: AppState) => state.Pet);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const getBearing = (bearing: number): string => {
    let result = "";
    bearing === 1
      ? (result = "Pequeno")
      : bearing === 2
      ? (result = "Médio")
      : (result = "Grande");

    return result;
  };

  const query = useQuery();

  const id = query.get("id");

  useEffect(() => {
    const onePet: PET = petState.find((pet) => pet.id === Number(id)) as PET;
    setPets(onePet);
  }, [id, petState]);

  return (
    <>
      <Header />
      {pets && (
        <>
          <div className="box">
            <div className="minibox column">
              <div
                style={{ display: "flex", alignItems: "start" }}
                className="column"
              >
                <img src={pets.image} alt="pet" />
                <h2 className="title">{pets.name}</h2>
                <p>Descrição: {pets.description}</p>
              </div>
            </div>

            <div className="minibox column">
              <div
                style={{ display: "flex", alignItems: "start" }}
                className="column"
              >
                <h3>Informações do Pet</h3>
                <p className="title">Porte: {getBearing(pets.bearing)}</p>
                <p className="title">Idade: {pets.age}</p>
              </div>

              <div
                style={{ display: "flex", alignItems: "start", marginTop: 40 }}
                className="column"
              >
                <h3>Informações do abrigo</h3>
                <p className="title">Nome: {pets.user.name}</p>
                <p className="title">Descrição: {pets.user.description}</p>
                <p className="title">Estado: {pets.user.uf}</p>
                <p className="title">Cidade: {pets.user.city}</p>
                <p className="title">Email: {pets.user.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pet;
