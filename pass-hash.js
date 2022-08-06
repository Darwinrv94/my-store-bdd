const bcrypt = require('bcrypt');

async function hashPassword() {
  const mysPassword = 'admin 123 .202';
  const hash = await bcrypt.hash(mysPassword, 10);

  console.log(hash);
}

hashPassword();
