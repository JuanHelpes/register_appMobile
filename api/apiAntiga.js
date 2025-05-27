const express = require("express");
const app = express();
const port = 3000; //porta padrão
const mysql = require("mysql2");
// var csv = require('csvtojson')
var jsontocsv = require("json2csv");
var multer = require("multer");
const path = require("path");
const readline = require("readline");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const jwt = require("jsonwebtoken");
const privateKey = "chavePrivada123";

const db = {
  host: "18.214.104.16",
  port: 3306,
  user: "20193015283",
  password: "20193015283",
  database: "20193015283",
};

const middlewareValidarJWT = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  jwt.verify(jwtToken, privateKey, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }

    req.userInfo = userInfo;
    next();
  });
};

app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Funcionando!" }));

function execSQLQuery(sqlQry, id, res) {
  const connection = mysql.createConnection(db);

  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("executou!");
  });
}

// retorna result para query
async function resultSQLQuery(sqlQry, id) {
  const connection = mysql.createConnection(db);

  var [result] = await connection.promise().query(sqlQry, id);
  try {
    return result;
  } catch (err) {
    console.log("error");
    throw err;
  }
}

function execSQLQueryGetAndWrite(sqlQry, id, res) {
  const connection = mysql.createConnection(db);

  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    if (error) res.json(error);
    connection.end();
    console.log("executou!");

    const csvWriter = createCsvWriter({
      path: "output.csv",
      header: [{ id: "par_id", title: "Id" }],
    });
    console.log(results);
    csvWriter
      .writeRecords(results)
      .then(() => console.log("The CSV file was written successfully"));
  });
}

function execSQLQueryGetAndWritePresenca(sqlQry, id, res) {
  const connection = mysql.createConnection({
    host: "18.214.104.16",
    port: 3306,
    user: "20193015283",
    password: "20193015283",
    database: "20193015283",
  });

  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    if (error) res.json(error);
    connection.end();
    console.log("executou!");

    const csvWriter = createCsvWriter({
      path: "presenca.csv",
      header: [{ id: "nome", title: "Nomes" }],
    });
    console.log(results);
    csvWriter
      .writeRecords(results)
      .then(() => console.log("The CSV file was written successfully"));
  });
}

function execSQLQueryInsertMany(sqlQry, id, res) {
  const connection = mysql.createConnection({
    host: "18.214.104.16",
    port: 3306,
    user: "20193015283",
    password: "20193015283",
    database: "20193015283",
  });

  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    if (error) res.json(error);
    connection.end();
    console.log("executou!");
  });
}

//seleciona todos os usuarios
app.get("/usuarios", middlewareValidarJWT, (req, res) => {
  execSQLQuery("SELECT * FROM `20193015283`.Usuarios;", null, res);
});

//verifica se existe um usuario
app.post("/login", async (req, res) => {
  const data = req.body;
  const id = [data.email, data.senha];
  var [result] = await resultSQLQuery(
    "SELECT usu_id FROM Usuarios WHERE email = ? and senha = ?",
    id
  );

  if (result) {
    jwt.sign(req.body, privateKey, (err, token) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

        return;
      }
      res.set("x-access-token", token);
      res.set("usu_id", result.usu_id);
      res.end();
    });
  } else {
    res.status(401);
    res.send("mensage:" + false);
    res.end();
  }
});

//seleciona um usuario
app.get("/usuarios/:id", middlewareValidarJWT, (req, res) => {
  const id = [req.params.id];
  execSQLQuery("SELECT * FROM Usuarios WHERE usu_id=?", id, res);
});

//edita um usuario
app.post("/EditaUsuario/:id", middlewareValidarJWT, (req, res) => {
  const data = req.body;
  const id = [data.nome, data.email, data.senha, req.params.id];
  execSQLQuery(
    "UPDATE Usuarios SET nome = ?, email = ?, senha = ? WHERE usu_id = ?;",
    id,
    res
  );
});

//deleta um usuario
app.delete("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM Usuarios WHERE usu_id=?", id, res);
});

//registra novo usuario
app.post("/CriaUsuario", (req, res) => {
  const data = req.body;
  const id = [data.nome, data.email, data.senha];
  execSQLQuery(
    "INSERT INTO Usuarios(nome, email, senha) VALUES(?, ?, ?)",
    id,
    res
  );
});

//cria um evento associado a um usuario // feito
app.post("/usuarios/criaEvento/:id", middlewareValidarJWT, (req, res) => {
  const data = req.body;
  console.log(data.nome);
  const id = [
    data.nome,
    data.dataInicial,
    data.dataFinal,
    data.status,
    req.params.id,
  ];
  execSQLQuery(
    "INSERT INTO Eventos (nome, dataInicial, dataFinal, status, Usuario_usu_id) VALUES (?, ?, ?, ?, ?)",
    id,
    res
  );
});

// retorna todos os eventos do usuario //feito
app.get("/usuarios/eventos/:id", middlewareValidarJWT, (req, res) => {
  const id = [req.params.id];
  execSQLQuery("select * from Eventos where Usuario_usu_id = ?", id, res);
  // execSQLQuery('select Eventos.nome, Eventos.status from Eventos inner join Usuarios_no_Eventos on (eve_id = Eventos_eve_id) inner join Usuarios  on (usu_id = Usuarios_usu_id) where usu_id = ?',id, res);
});

// app.get("/usuarios/eventos/:id" ,(req, res) => {
//   const id = [req.params.id];
//   execSQLQuery("select * from Eventos where Usuario_usu_id = ?", id, res);
//   // execSQLQuery('select Eventos.nome, Eventos.status from Eventos inner join Usuarios_no_Eventos on (eve_id = Eventos_eve_id) inner join Usuarios  on (usu_id = Usuarios_usu_id) where usu_id = ?',id, res);
// });

//retorna todos os eventos compartilhados
app.get(
  "/usuarios/eventosCompartilhados/:id",
  middlewareValidarJWT,
  (req, res) => {
    const id = [req.params.id];
    execSQLQuery(
      "select Eventos.nome, Eventos.status, Eventos.eve_id from Eventos inner join Usuarios_no_Eventos on (eve_id = Eventos_eve_id) inner join Usuarios  on (usu_id = Usuarios_usu_id) where usu_id = ?",
      id,
      res
    );
  }
);

//retorna todos os usuarios que tem acesso ao evento
app.get("/usuarios/AcessaEvento/:id", middlewareValidarJWT, (req, res) => {
  const id = [req.params.id];
  execSQLQuery(
    "select Usuarios.nome, Usuarios.usu_id from Usuarios inner join Usuarios_no_Eventos on (usu_id = Usuarios_usu_id) inner join Eventos  on (eve_id = Eventos_eve_id) where eve_id= ?",
    id,
    res
  );
});

//deleta um evento
app.delete(
  "/usuarios/deletaEvento/:idEvento",
  middlewareValidarJWT,
  (req, res) => {
    const id = [req.params.idEvento];
    execSQLQuery("DELETE FROM Eventos WHERE eve_id=?", id, res);
  }
);

//seleciona um evento
app.get("/usuarios/evento/:idEvento", middlewareValidarJWT, (req, res) => {
  const id = [req.params.idEvento];
  execSQLQuery(
    "SELECT nome, DATE_FORMAT(dataInicial, '%Y-%m-%d') AS dataInicial , DATE_FORMAT(dataFinal, '%Y-%m-%d') AS dataFinal, status FROM Eventos where eve_id =?",
    id,
    res
  );
  // execSQLQuery("SELECT nome, dataInicial, dataFinal, status FROM Eventos where eve_id =?", id, res);
});

//atualiza um evento
app.put("/usuarios/EditaEvento/:id", middlewareValidarJWT, (req, res) => {
  const data = req.body;
  const id = [
    data.nome,
    data.dataInicial,
    data.dataFinal,
    data.status,
    req.params.id,
  ];
  execSQLQuery(
    "UPDATE Eventos SET nome= ?, dataInicial = ?, dataFinal = ?, status = ?  WHERE eve_id= ?",
    id,
    res
  );
});

//compartilha um evento
app.post(
  "/usuarios/compartilhaEvento/:idEvento",
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    const id = [data.usu_id, req.params.idEvento];
    execSQLQuery(
      "INSERT INTO Usuarios_no_Eventos (Usuarios_usu_id, Eventos_eve_id) VALUES (?, ?)",
      id,
      res
    );
  }
);

//deleta um organizador do evento
app.delete(
  "/usuarios/retiraOrganizador/:idEvento",
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    const id = [data.usu_id, req.params.idEvento];
    execSQLQuery(
      "delete from Usuarios_no_Eventos where Usuarios_usu_id = ? and Eventos_eve_id = ?",
      id,
      res
    );
  }
);

//Cria uma atividade em um evento
app.post(
  "/evento/criaAtividade/:idEvento",
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    const id = [data.nome, req.params.idEvento];
    execSQLQuery(
      "INSERT INTO Atividade (nome, Eventos_eve_id) VALUES (?, ?)",
      id,
      res
    );
  }
);

//retorna todas as atividades de um evento
// app.get("/evento/atividade/:idEvento", middlewareValidarJWT,(req, res) => {
//   const id = [req.params.idEvento];
//   execSQLQuery("select * from Atividade where Eventos_eve_id = ?", id, res);
//   // execSQLQuery('select Eventos.nome, Eventos.status from Eventos inner join Usuarios_no_Eventos on (eve_id = Eventos_eve_id) inner join Usuarios  on (usu_id = Usuarios_usu_id) where usu_id = ?',id, res);
// });

app.get("/evento/atividade/:idEvento", middlewareValidarJWT, (req, res) => {
  const id = [req.params.idEvento];
  execSQLQuery("select * from Atividade where Eventos_eve_id = ?", id, res);
  // execSQLQuery('select Eventos.nome, Eventos.status from Eventos inner join Usuarios_no_Eventos on (eve_id = Eventos_eve_id) inner join Usuarios  on (usu_id = Usuarios_usu_id) where usu_id = ?',id, res);
});

//atualiza uma atividade
app.put("/evento/atualizaAtividade/:id", middlewareValidarJWT, (req, res) => {
  const data = req.body;
  const id = [data.nome, req.params.id];
  execSQLQuery("UPDATE Atividade SET nome= ? WHERE ati_id= ?", id, res);
});

//deleta uma atividade
app.delete("/evento/deletaAtividade/:id", middlewareValidarJWT, (req, res) => {
  // const data = req.body;
  const id = [req.params.id];
  execSQLQuery("delete from Atividade where ati_id = ?", id, res);
});

//Carrega uma lista de participantes

// https://www.positronx.io/how-to-import-csv-file-records-in-mongodb-with-node-js/        link mais perto do certo

// https://medium.com/matheus-rossi/importando-dados-de-um-arquivo-xlsx-para-o-banco-de-dados-relacional-com-nodejs-11e5aa4b1c0b    outro link

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
    // console.log(file.originalname)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post(
  "/evento/carregaParticipantes/:idEvento",
  upload.single("file"),
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    console.log(upload.storage.filename);
    //   const line = readline.createInterface({
    //     input: fs.createReadStream(req.body.file),
    //   });
    //   let firstLine = true;
    //   line.on("line", (data) => {
    //     let csv = data.split(",")
    //     if(firstLine){
    //       firstLine = false;
    //       return;
    //     }
    //     // console.log(csv);
    //     const id = [ csv, req.params.idEvento];
    //     // console.log(id)
    //     execSQLQueryInsertMany('INSERT INTO Participantes (nome, Eventos_eve_id) VALUES (?, ?)',id, res);
    //   })

    //   res.send("Cadastrados")
  }
);

// var empResponse
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })
// var uploads = multer({ storage: storage })

// app.post('/CarregaParticipantes', uploads.single('csvFile'), (req, res) => {
//   csv()
//     .fromFile(req.file.path)
//     .then((response) => {
//       for (var x = 0; x < response; x++) {
//         empResponse = parseFloat(response[x].Name)
//         response[x].Name = empResponse
//       }
//       empSchema.insertMany(response, (err, data) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.redirect('/')
//         }
//       })
//     })
// })

//Gera uma lista de Ids
app.get("/evento/geraIds/:idEvento", (req, res) => {
  const data = req.body;
  const id = [req.params.idEvento];

  // const csvWriter = createCsvWriter({
  //   path: 'output.csv',
  //   header: [
  //       {id: 'id', title: 'Id'}
  //   ]
  // });
  execSQLQueryGetAndWrite(
    "select par_id from Participantes where Eventos_eve_id = ?",
    id,
    res
  );
  res.send("Lista gerada");
});

//registrar presença
app.post(
  "/evento/atividade/registraPresenca/:id",
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    const id = [data.par_id, req.params.id];
    execSQLQuery(
      "INSERT INTO Presenca (Participantes_par_id, Atividade_ati_id) VALUES (?, ?)",
      id,
      res
    );
  }
);

//retorna todos os participantes ja registrados na lista de presença
app.get("/usuarios/Evento/ListaPresenca/:idAtividade", (req, res) => {
  const id = [req.params.idAtividade];
  execSQLQuery(
    "select Participantes.nome, Participantes.par_id from Participantes  inner join Presenca on (par_id = Participantes_par_id) where Atividade_ati_id = ?",
    id,
    res
  );
});

//deleta uma presenca
app.delete(
  "/evento/deletaPresenca/:idPar",
  middlewareValidarJWT,
  (req, res) => {
    // const data = req.body;
    const id = [req.params.idPar];
    execSQLQuery(
      "DELETE FROM Presenca WHERE Participantes_par_id = ?",
      id,
      res
    );
  }
);

//Gera uma lista de Presença
app.get(
  "/evento/atividade/geraListaPresenca/:id",
  middlewareValidarJWT,
  (req, res) => {
    const data = req.body;
    const id = [req.params.id];

    const csvWriter = createCsvWriter({
      path: Date.now() + "presenca.csv",
      header: [{ id: "nome", title: "Nome" }],
    });
    execSQLQueryGetAndWritePresenca(
      "select Participantes.nome from Participantes inner join Presenca on (par_id = Participantes_par_id)  inner join Atividade on (ati_id = Atividade_ati_id) where ati_id = ?",
      id,
      res
    );
    // execSQLQueryGetAndWrite('select Eventos.nome from Participantes where Eventos_eve_id = ?',id, res)
    res.send("OK");
  }
);

//inicia o servidor
app.listen(port);
console.log("API funcionando!");
