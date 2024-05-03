const { Router } = require("express");
const perroRoute = require("./perroRoute");
const temperamentoRoute = require("./temperamentoRoute");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", perroRoute);
router.use("/temperaments", temperamentoRoute);

module.exports = router;
