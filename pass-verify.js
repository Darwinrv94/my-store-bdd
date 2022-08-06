const bcrypt = require('bcrypt');

async function verifyPassword() {
  const mysPassword = 'admin 123 .202';
  const hash = '$2b$10$XwDmNDEKNyzI2bhu6mz.bu2LiuJKE61TNrhrJU8bkxtMCl6FVAOmS';

  const isValid = await bcrypt.compare(mysPassword, hash);

  console.log(isValid);
}

verifyPassword();
