const { Router } = require("express");
const { Perro, Temperamento, Raza } = require("../db");
const { Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const dogApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let apiInfo = await dogApi.data.map((dog) => {
    return {
      id: dog.id,
      nombre: dog.name,
      altura: dog.height.metric,
      peso: dog.weight.metric,
      anio_de_vida: dog.life_span,
      imagen: dog.image.url,
      temperamento: dog.temperament,
    };
  });
  return apiInfo;
};

const getAllDogs = async () => {
  const perrosDb = await Perro.findAll({
    include: [
      {
        model: Temperamento,
        attributes: ["nombre"],
        through: {
          attributes: [],
        },
      }
    ],
  });

  const perrosFormateados = perrosDb.map(perro => {
    // Verificar si perro.Temperamentos está definido y no es null
    const temperamentos = perro.temperamentos ? perro.temperamentos.map(temp => temp.nombre).join(", ") : '';

    // Crear un nuevo objeto con el formato deseado
    return {
      id: perro.id,
      imagen: perro.imagen,
      nombre: perro.nombre,
      altura: perro.altura,
      peso: perro.peso,
      anio_de_vida: perro.anio_de_vida,
      temperamento: temperamentos, // Agregar la cadena de temperamentos formateada
    };
  });
  return perrosFormateados;
};

router.get("/", async (rq, rs) => {
  const source = rq.query.source;
  const name = rq.query.name;
  let data;
  if (source === "db") {
    data = await getAllDogs();
  } else if (source === "api") {
    data = await getApiInfo();
  } else {
    const perrosDb = await getAllDogs();
    const perrosApi = await getApiInfo();
    data = perrosDb.concat(perrosApi);
  }
  if (name !== null && name !== undefined) {
    data = data.filter((item) => item.nombre.toLowerCase().includes(name.toLowerCase()));
  }
  rs.status(200).send(data);
});

router.get("/id/:id", async function (rq, rs, next) {
  try {
    const id = rq.params.id;
    const source = rq.query.source;
    let perros;
    if (source === "db") {
      perros = await getAllDogs();
    } else if (source === "api") {
      perros = await getApiInfo();
    } else {
      const perrosDb = await getAllDogs();
      const perrosApi = await getApiInfo();
      perros = perrosDb.concat(perrosApi);
    }
    if (id) {
      let perroById = await perros.filter((item) => item.id == id);
      if (perroById.length) {
        rs.status(200).send(perroById[0]);
      } else {
        rs.status(400).send({ info: "no se encontro el perro" });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (rq, rs, next) => {
  try {
    const {
      imagen,
      nombre,
      altura,
      peso,
      anio_de_vida,
      razaId,
      temperamentos,
    } = rq.body;
    const newPerro = await Perro.create({
      imagen,
      nombre,
      altura,
      peso,
      anio_de_vida,
      razaId,
    });
    let temperamentosDb = await Temperamento.findAll({
      where: { id: { [Sequelize.Op.in]: temperamentos } },
    });

    await newPerro.addTemperamento(temperamentosDb);
    rs.status(201).send({ info: "se ha creado el perro" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
