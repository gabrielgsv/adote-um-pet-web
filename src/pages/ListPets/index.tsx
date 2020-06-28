import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPets } from "../../redux/actions/Pet";
import { AppState } from "../../redux/store";
import { PET } from "../../redux/actions/Pet";
import { Link } from "react-router-dom";

import "./style.css";
import ImgNotFound from "../../assets/not-found.svg";

import Header from "../../componenets/Header";
import CardLoading from "../../componenets/CardLoading";

const ListPets = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const uf: string = localStorage.getItem("uf")!;
  const city: string = localStorage.getItem("city")!;

  const pets: PET[] = useSelector((state: AppState) => state.Pet);

  function LoadingFalse() {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    dispatch(GetPets(uf, city, () => LoadingFalse()));
  }, [city, dispatch, uf]);

  const getBearing = (bearing: number): string => {
    let result = "";
    bearing === 1
      ? (result = "Pequeno")
      : bearing === 2
      ? (result = "Médio")
      : (result = "Grande");

    return result;
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        ) : pets !== undefined && pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet.id} className="card">
              <img className="pet" src={pet.image} alt="pet" width="250px" />
              <h2>{pet.name}</h2>
              <p className="subText">Idade: {pet.age}</p>
              <p className="subText">Porte: {getBearing(pet.bearing)}</p>
              <Link
                to={{
                  pathname: "/pet",
                  search: `?id=${pet.id}`,
                }}
              >
                <button className="adopt">Adotar</button>
              </Link>
            </div>
          ))
        ) : (
          <img src={ImgNotFound} alt="Não encontrado" />
        )}
      </div>
    </>
  );
};

export default ListPets;
