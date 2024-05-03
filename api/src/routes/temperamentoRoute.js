const { Router } = require("express");
const { Temperamento } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const getAllTemperaments = async () => {

  const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

  const apiTemperamentsArray = response.data.reduce((temperaments, dogBreed) => {
    if (dogBreed.temperament) {
      const breedTemperaments = dogBreed.temperament.split(',').map((temperament) => temperament.trim());
      temperaments.push(...breedTemperaments);
    }
    return temperaments;
  }, []);


  const uniqueTemperaments = [...new Set(apiTemperamentsArray)];

  for (const temperament of uniqueTemperaments) {
    await Temperamento.create({ nombre: temperament });
  }

  const dbTemperaments = await Temperamento.findAll();

  const allTemperaments = dbTemperaments.map((temperament) => temperament.nombre);
  return allTemperaments;
};

router.get("/", async (rq, rs) => {
 
  const temperamentos = await getAllTemperaments();
  rs.status(200).send(temperamentos);
});

module.exports = router;
