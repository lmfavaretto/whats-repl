const express = require('express');
const { create } = require('@wppconnect-team/wppconnect');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let clientSession = null;
let qrCodeData = '';

create({
  session: 'mvp-session',
  catchQR: (base64Qrimg) => {
    qrCodeData = base64Qrimg;
  },
  headless: true,
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}).then((client) => {
  clientSession = client;
  console.log('WhatsApp client is ready!');
});

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.get('/qr', (req, res) => {
  if (qrCodeData) {
    res.send(`<img src="${qrCodeData}" />`);
  } else {
    res.send('QR Code ainda não gerado. Aguarde alguns segundos e atualize.');
  }
});

app.get('/enviar', async (req, res) => {
  if (!clientSession) {
    return res.status(500).send('Cliente não iniciado.');
  }

  const { numero, mensagem } = req.query;

  if (!numero || !mensagem) {
    return res.status(400).send('Parâmetros "numero" e "mensagem" são obrigatórios.');
  }

  try {
    await clientSession.sendText(`${numero}@c.us`, mensagem);
    res.send('Mensagem enviada com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao enviar mensagem: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});