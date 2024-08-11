// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./src/config/database');
const rifaRoutes = require('./src/routes/rifa');
const adminRoutes = require('./src/routes/admin');
const path = require('path');
const PORT = process.env.PORT;
const app = express();



// Configuración de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secret_key', // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: true,
}));
// Configuración de rutas
app.use('/', rifaRoutes);
app.use('/admin', adminRoutes);

// Sincronizar base de datos y iniciar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:' + PORT);
  });
});
