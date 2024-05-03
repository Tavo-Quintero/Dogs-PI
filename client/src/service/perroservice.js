import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs/"); //aca sucede toda la conexion entre el front y el back
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function dogDetail(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs/id" + id);
    return dispatch({
      type: "DOG_DETAIL",
      payload: json.data,
    });
  };
}

export function postDog(payload) {
  //esto me va a devolver la información de los dogs que se agregan por post
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/dogs/", payload); // uso axios.post para disparar la accion de crear un god
    /* console.log(json)*/ //en esta ruta quiero hacer el post del payload (lo que llega en el front)
    return dispatch({
      type: "POST_DOG",
      payload: json.data,
    });
  };
}
