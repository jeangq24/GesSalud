const { Router } = require("express");
const { Persona } = require("../db");
const router = Router();
// const { v4: uuidv4 } = require("uuid");

router.get("/", async function (req, res, next) {
  let especialistas = await Persona.findAll();

  res.send(especialistas);
});

module.exports = router;

router.post("/", async function (req, res) {
  const data = req.body;
  try {
    const creandoPaciente = await Persona.create(
      {
        // id: uuidv4(),
        name: data.name,
        lastName: data.lastName,
        dni: data.dni,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        birth: data.birth,
        user: data.user,
        password: data.password,
      },
      {
        fields: [
          /* "id", */ "name",
          "lastName",
          "dni",
          "email",
          "phone",
          "adress",
          "birth",
          "user",
          "password",
        ],
      }
    );

    /*    for (let i = 0; i < breed.temperament.length; i++) {
      let tempId = await Temperamentos.findOne({
        where: { name: breed.temperament[i] },
      });
      await creandoEspecialista.addTemperamentos(tempId.id);
    } */
    // let tempPromise = await Promise.all(
    //   breed.temperament.map((el) =>
    //     Temperamentos.findOne({ where: { name: el } })
    //   )
    // );

    // createDog.setTemperamentos(tempPromise);

    res.json(creandoPaciente);
  } catch (e) {
    res.status(400).send("no se puedo crear al Paciente");
  }
});

module.exports = router;
