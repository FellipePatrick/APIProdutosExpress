const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

let produtos = [];
let nextId = 1;


app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || typeof preco !== 'number') {
    return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios' });
  }
  const novoProduto = { id: nextId++, nome, preco };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  res.json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  const { nome, preco } = req.body;
  if (nome) produto.nome = nome;
  if (typeof preco === 'number') produto.preco = preco;
  res.json(produto);
});

app.delete('/produtos/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  produtos.splice(index, 1);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
