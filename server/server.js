require('dotenv').config({ path: '../.env' })

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.post('/modules', (req, res) => {
    const { name, user_id } = req.body
    if (!name || !user_id) {
        return res.status(400).json({error: "Название и user_id обязательны"})
    }
    const sql = "INSERT INTO modules (name, user_id) VALUES (?, ?)";
    db.query(sql, [name, user_id], (err, data) => {
        if (err) return res.json(err)
        return res.json({message: "Module created", id: data.insertId})
    })
})

app.get('/', (req, res)=> {
    return res.json("server :)");
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/modules', (req, res)=> {
    const sql = "SELECT * FROM modules";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/cards', (req, res)=> {
    const sql = "SELECT * FROM cards";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/cards/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM cards WHERE module_id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(process.env.PORT, ()=> {
    console.log("listening");
})

app.post('/cards', (req, res) => {
    const { module_id, word_original, word_translation } = req.body;
    if (!module_id || !word_original || !word_translation) {
        return res.status(400).json({ error: "module_id, word_original и word_translation обязательны" });
    }
    const sql = "INSERT INTO cards (module_id, word_original, word_translation) VALUES (?, ?, ?)";
    db.query(sql, [module_id, word_original, word_translation], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "Карта создана", id: data.insertId });
    });
});

app.put('/cards/:id', (req, res) => {
    const id = req.params.id;
    const { word_original, word_translation } = req.body;
    if (!word_original || !word_translation) {
        return res.status(400).json({ error: "word_original и word_translation обязательны" });
    }
    const sql = "UPDATE cards SET word_original = ?, word_translation = ? WHERE id = ?";
    db.query(sql, [word_original, word_translation, id], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Карта не найдена" });
        }
        return res.json({ message: "Card updated" });
    });
});

app.delete('/cards/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM cards WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Карта не найдена" })
        }
        return res.json({ message: "Карта удалена" })
    })
})