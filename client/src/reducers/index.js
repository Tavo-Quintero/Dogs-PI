import { combineReducers } from 'redux';
import navigationReducer from '../reducer/navegationReducer'; // Suponiendo que tienes un reducer para la navegación

const rootReducer = combineReducers({
  // Aquí puedes agregar más reducers si los tienes
  navigation: navigationReducer
});

export default rootReducer;