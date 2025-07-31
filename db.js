const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados local
const db = new sqlite3.Database('./meubanco.db');

// Cria uma tabela
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER
)`);

// Insere um dado
db.run(`INSERT INTO usuarios (nome, idade) VALUES (?, ?)`, ['João', 30]);

// Consulta dados
db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) throw err;
    console.log(rows);
});

// Fecha o banco
db.close();
