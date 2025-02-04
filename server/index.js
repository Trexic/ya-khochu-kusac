require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
    const { login, password, firstName, lastName, phone, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (login, password, first_name, last_name, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [login, password, firstName, lastName, phone, email]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Авторизация пользователя
app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.json({ success: false, message: 'Неверный логин или пароль' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Создание бронирования
app.post('/api/bookings', async (req, res) => {
    const { userId, date, time, guests, phone } = req.body;
    try {
        await pool.query('INSERT INTO bookings (user_id, date, time, guests, phone) VALUES ($1, $2, $3, $4, $5)', [userId, date, time, guests, phone]);
        res.sendStatus(201);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Получение бронирований пользователя
app.get('/api/bookings/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Получение всех бронирований
app.get('/api/bookings', async (req, res) => {
    try {
        const result = await pool.query('SELECT u.login, b.* FROM bookings b JOIN users u ON b.user_id = u.id');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Обновление статуса бронирования
app.put('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, id]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});