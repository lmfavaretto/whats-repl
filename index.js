
const express = require('express');
const { create } = require('venom-bot');

const app = express();
const PORT = process.env.PORT || 3000;

let client = null;
let qrCodeBase64 = null;

create({
  session: 'mvp-session',
  multidevice: true,
  headless: true,
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium-browser',
  },
})
  .then((clientInstance) => {
    client = clientInstance;
    console.log('Bot conectado!');
  })
  .catch((err) => {
    console.error('Erro ao iniciar o bot', err);
  });

app.get('/', (req, res) => {
  res.send('Servidor do WhatsApp bot está online.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
