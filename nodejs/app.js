const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

app.use((req, res) => {
  const steamUrl = req.url.slice(1);
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  axios
    .get(steamUrl, {
      headers: {
        ...corsHeaders,
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((response) => {
      res.set(corsHeaders);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на порту ${port}`);
});
