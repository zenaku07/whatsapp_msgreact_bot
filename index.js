const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');
const { generateQRCode } = require('./messageController/qrcode');
const { reactToMessage } = require('./messageController/reaction');

// Initialize the WhatsApp client without session data
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
});

// Event when the client is ready
client.on('ready', () => {
  console.log('Client is ready!');
});

// Event when a new message is received
client.on('message', async (msg) => {
  try {
    if (msg.fromMe || !msg.from.endsWith('@c.us')) return; // Ignore messages sent by the bot itself or from groups

    const command = msg.body.trim().toLowerCase();

    if (command === '!qrcode') {
      // Handle QR code generation here
      const sessionId = client.getSessionId();
      const qrCodeDataUrl = await generateQRCode(sessionId);
      msg.reply(qrCodeDataUrl);
    } else if (command === '!start') {
      // Send the introduction message for the bot
      const introMsg = '👋 Hello!\n\nMy name is Obito. \n\nAnd I am a UserBot';
      msg.reply(introMsg);
    } else {
      // React to personal messages with a thumb emoji
      reactToMessage(msg);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// Generate the QR code for authentication
client.on('qr', (qr) => {
  console.log('Scan the QR code with your phone:');
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Error generating QR code:', err);
    } else {
      // Log the base64 string representation of the QR code
      console.log(url);
    }
  });
});

// Connect the client
client.initialize();

// Prevent the Node.js project from idling by keeping the script running forever
setInterval(() => {
  console.log('Bot is still running...');
}, 60 * 60 * 1000);
