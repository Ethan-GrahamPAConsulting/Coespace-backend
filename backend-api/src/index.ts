import Express = require("express");

const app = Express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.status(200).json({ status: 'active', message: 'CoSpace API is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export = app;
