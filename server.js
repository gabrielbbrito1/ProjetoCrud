const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const path = require('path');

const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://desafio1cdm:desafio1cdm@desafio1cdm.njqir.mongodb.net/Desafio1CDM?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('Desafio1CDM');

    app.listen(3000, () => {
        console.log('server running on port 3000');
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index-funcionario.ejs');
});

app.get('/', (req, res) => {
    let cursor = db.collection('funcionario').find();

});

app.get('/show-funcionario', (req, res) => {
    db.collection('funcionario').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show-funcionario.ejs', { funcionario: results })

    })
})

app.post('/show-funcionario', (req, res) => {
    db.collection('funcionario').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show-funcionario')
    })
});

app.route('/edit-funcionario/:id')
    .get((req, res) => {
        let id = req.params.id

        db.collection('funcionario').find(ObjectId(id)).toArray((err, result) => {
            if (err) return res.send(err)
            res.render('edit-funcionario.ejs', { funcionario: result })
        })
    })
    .post((req, res) => {
        let id = req.params.id
        let filial = req.body.filial
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let cpf = req.body.cpf
        let cep = req.body.cep
        let cidade = req.body.cidade
        let estado = req.body.estado
        let endereco = req.body.endereco
        let funcao = req.body.funcao
        let contato = req.body.contato

        db.collection('funcionario').updateOne({ _id: ObjectID(id) }, {
            $set: {
                filial: filial,
                nome: nome,
                sobrenome: sobrenome,
                cpf: cpf,
                cep: cep,
                cidade: cidade,
                estado: estado,
                endereco: endereco,
                funcao: funcao,
                contato: contato
            }
        }, (err, result) => {
            if (err) return res.send(err)
            res.redirect('/show-funcionario')
            console.log('atualizado no banco de dados')
        })
    })
app.route('/delete/:id')
    .get((req, res) => {
        let id = req.params.id

        db.collection('funcionario').deleteOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) return res.send(500, err)
            console.log('Deletando do banco de dados!')
            res.redirect('/show-funcionario')
        })
    })