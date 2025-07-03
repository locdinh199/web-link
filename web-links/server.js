const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

let keys = [];

// Load keys lúc khởi động
function loadKeys() {
  try {
    const data = fs.readFileSync('keys.txt', 'utf-8');
    keys = data.split('\n').map(k => k.trim()).filter(Boolean);
  } catch (err) {
    console.error('Không đọc được keys.txt:', err);
    keys = [];
  }
}

loadKeys();

app.use(express.static('public'));

app.get('/get-key', (req, res) => {
  if (keys.length === 0) return res.send('🚫 Hết key!');

  const index = Math.floor(Math.random() * keys.length);
  const key = keys.splice(index, 1)[0];

  // Ghi lại keys còn lại
  fs.writeFileSync('keys.txt', keys.join('\n'));

  res.send(`✅ Key của bạn: ${key}`);
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
