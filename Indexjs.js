const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/tasks-db', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('Conectado a MongoDB');
});
app.get('/', (req, res) => {
 res.send('¡Bienvenido a Tasks App!');
});
// Aquí puedes agregar rutas de API para autenticación, registro, creación de tareas, etc.
app.listen(3000, () => {
 console.log('El servidor de la aplicación Tasks está escuchando en el puerto 3000');
});
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
 name: {
 type: String,
 required: true,
 },
 priority: {
 type: Number,
 default: 1,
 },
 dueDate: {
 type: Date,
 required: true,
 },
 user: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: true,
 },
});
module.exports = mongoose.model('Task', TaskSchema);
const Task = require('../models/task.model');
exports.createTask = async (req, res) => {
 try {
 const newTask = await Task.create(req.body);
 res.status(201).json(newTask);
 } catch (err) {
 res.status(400).json(err.message);
 }
};
// Aquí puedes agregar otras rutas de la API, como getTasks, updateTask, deleteTask, etc