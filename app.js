import express from "express";
import pets from "./petList.js";

const app = express();
const port = 8000;

app.get('/', (req , res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adopt a Pet!</title>
  </head>
  <body>
    <h1> Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
    <li><a href="/animals/dogs">Doggies</a> </li>
    <li><a href="/animals/cats">Kitties</a></li>
    <li><a href="/animals/rabbits">Rabbities</a> </li>
    </ul>
  </body>
  </html>`)
})

app.get('/animals/:pet_type', (req, res) => {
  const pet_type = req.params.pet_type;
  const pet_type_array = pets[pet_type]

  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1> List of ${pet_type}</h1>
    ${pet_type_array.map((pet, index) => `
    <ul>
     <img src="${pet.url}" alt="${pet.name}">
    <li><a href="/animals/${pet_type}/${index}"> Name :${pet.name}</a></li>
    <li> Age :${pet.age}</li>
    <li>Breed: ${pet.breed}</li>
    <li> Description: ${pet.description}</li>
    </ul>`)}

  </body>
  </html>`)
})

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = parseInt(req.params.pet_id)
  const findPet = pets[petType][petId]

  if (findPet) {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1> ${findPet.name}</h1>
    <ul> <img src="${findPet.url}" alt="${findPet.name}"><li> Age :${findPet.age}</li><li>Breed: ${findPet.breed}</li><li> Description: ${findPet.description}</li></ul>
    </body>
    </html>`

    );
  } else {
    res.status(404).send('Pet not found');
  }
})



app.listen(port, () => {
  console.log("Pets app running on port : ", port)
})