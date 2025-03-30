# WhatsApp MVP com WPPConnect no Replit

Este projeto conecta o WhatsApp Web via leitura de QR Code usando WPPConnect, com backend simples em Node.js + Express.

## Como usar

1. Faça o deploy no Replit (via import GitHub).
2. Clique em **Run**.
3. Acesse `/qr` para escanear o QR Code e conectar o WhatsApp.
4. Envie mensagens acessando a rota:

```
/enviar?numero=5511999999999&mensagem=Olá! Teste.
```

> O número deve estar no formato `DDI + DDD + número`, sem espaços ou símbolos.