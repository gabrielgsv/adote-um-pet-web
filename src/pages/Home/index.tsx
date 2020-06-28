import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";
import { useHistory } from "react-router-dom";
import { removeAllPets } from "../../redux/actions/Pet";

import Header from "../../componenets/Header";

interface IBGEUfReponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const dispatch = useDispatch();

  const [allUfs, setAllUfs] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [uf, setUf] = useState<string>("0");
  const [city, setCity] = useState<string>("0");

  const [errorUf, setErrorUf] = useState(false);
  const [errorCity, setErrorCity] = useState(false);

  let history = useHistory();

  useEffect(() => {
    axios
      .get<IBGEUfReponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        const ufs = res.data.map((uf) => uf.sigla);
        setAllUfs(ufs);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((res) => {
        const cities = res.data.map((city) => city.nome);
        setAllCities(cities);
      });
  }, [uf]);

  function handleSubmit() {
    const oldUF = localStorage.getItem("uf");
    const oldCity = localStorage.getItem("city");
    if (oldCity !== city || oldUF !== uf) {
      dispatch(removeAllPets());
    }

    if (uf && uf !== "0") {
      if (city && city !== "0") {
        localStorage.setItem("uf", uf);
        localStorage.setItem("city", city);
        history.push("/listpets");
      } else {
        setErrorCity(true);
      }
    } else {
      setErrorUf(true);
    }
  }

  function handleChangeUf(e: ChangeEvent<HTMLSelectElement>) {
    setUf(e.target.value);
    setCity("0");
    errorUf && setErrorUf(false);
  }

  function handleChangeCity(e: ChangeEvent<HTMLSelectElement>) {
    setCity(e.target.value);
    errorCity && setErrorCity(false);
  }

  return (
    <>
      <Header />
      <div className="flexCenter">
        <div className="flexColumn">
          <div style={{ margin: "20px" }}>
            <p className="description">Adote um amigo, adote um pet.</p>
            <p className="description">
              Faça a diferença na vida desses animais.
            </p>
          </div>
        </div>

        <div className="flexColumn">
          <p
            style={{
              alignSelf: "flex-start",
              fontSize: "13pt",
              marginBottom: "0px",
            }}
          >
            Selecione Estado e Cidade:
          </p>
          <div>
            <select
              name="uf"
              placeholder="Estado (uf)"
              onChange={handleChangeUf}
              value={uf}
            >
              <option value="0" disabled>
                Selecione um Estado (UF)
              </option>
              {allUfs.map((uf) => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </select>
            {errorUf && (
              <p className="error">Por favor selecione um Estado(UF)</p>
            )}
          </div>

          <div>
            <select
              name="cities"
              placeholder="Cidades"
              onChange={handleChangeCity}
              value={city}
            >
              <option value="0" disabled>
                Selecione a cidade
              </option>
              {allCities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
            {errorCity && (
              <p className="error">Por favor selecione uma Cidade</p>
            )}
          </div>

          <div>
            <button className="enter" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
