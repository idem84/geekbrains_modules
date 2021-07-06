const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 5555;
const port = 5555; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
