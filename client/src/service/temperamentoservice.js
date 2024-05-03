export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperaments/");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}
