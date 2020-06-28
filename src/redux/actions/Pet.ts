import api from "../../api"

interface USER {
  id: number;
  name: string;
  description: string;
  email: string;
  uf: string;
  city: string;
};

export interface PET {
  id: number;
  name: string;
  description: string;
  bearing: number;
  age: number;
  image: string;
  user: USER;
};

export interface GET_PETS {
  type: any;
  pets: PET[]
}

export interface REMOVE_ALL_PETS {
  type: any;
}

export function GetPets(uf: string, city: string, callback: any) {
  return (dispatch: any, getState: any) => {
    api.get("pet/by-city", {
      headers: {
        "uf": uf,
        "city": city
      }
    })
      .then(res => {
        let pets:PET[] = []
        let datas:PET[] = res.data;

        const petState:PET[] = getState().Pet
        let ids:number[] = []
        petState.forEach(pet => {
          ids = [...ids, pet.id]
        });
        
        datas.forEach(pet => {
          if(ids.includes(pet.id)){
            return
          } else {
            pets = [...pets, pet]
          }
        });

        dispatch({
          type: "GET_PETS",
          pets
        })

        callback()
      })
      .catch(err => {
        console.error(err)
        callback()
      })
  }
}

export function removeAllPets () {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: "REMOVE_ALL_PETS"
    })
  }
}