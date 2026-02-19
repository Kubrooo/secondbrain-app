const app = require("./app");
const port = process.env.PORT || 3000;

module.exports = app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}