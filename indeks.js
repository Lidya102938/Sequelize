const { DataTypes } = require("sequelize");
const sequelize = require("./models/index").sequelize;
const express = require("express");
const app = express();
const Film = require("./models/film");
const port = 3300;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/create", async function (req, res) {
  const data = await Film(sequelize, DataTypes).create({ namaFilm: req.body.namaFilm, genre: req.body.genre, tahun: req.body.tahun });
  res.json(data);
});

app.get("/read", async function (req, res) {
  const data = await Film(sequelize, DataTypes).findAll();
  res.json(data);
});

app.delete("/delete/:id", async function (req, res) {
  const id = req.params.id;
  const data = await Film(sequelize, DataTypes).destroy({
    where: {
      id: id,
    },
  });
  res.json({ pesan: "Data berhasil di hapus" });
});

app.put("/update/:genre", async function (req, res) {
  const genre = req.params.genre;
  const data = await Film(sequelize, DataTypes).update(
    { namaFilm: req.body.namaFilm },
    {
      where: {
        genre: genre,
      },
    }
  );
  res.json({ pesan: "Data berhasil di update" });
});

app.listen(port, () => console.log("listening at port" + port));
