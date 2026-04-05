const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get("/nqueens", (req, res) => {
  res.sendFile(__dirname + "/nqueens.html");
})

app.get("/sorting", (req, res) => {
  res.sendFile(__dirname + "/sorting.html");
})

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
