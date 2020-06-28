import { GET_PETS } from "../actions/Pet"

const initialState: any[] = []
const ListPets = (state = initialState, action: GET_PETS) => {
  const { type, pets } = action

  switch (type) {
    case "GET_PETS":
      return [
        ...state,
        ...pets
      ];
    case "REMOVE_ALL_PETS":
      return initialState;
    default:
      return state;
  }
};

export default ListPets