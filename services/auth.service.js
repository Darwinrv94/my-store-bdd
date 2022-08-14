const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });

    await service.update(user.id, { recoveryToken: token });

    const link = `http://myfrontend.com/recovery?token=${token}`;

    const mail = {
      from: config.emailUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    }

    return await this.sendMail(mail);
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, { password: hash, recoveryToken: null });

      return { message: 'password changed' };
    } catch (error) {
     throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: config.emailPortSecure,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail(infoMail);

    return {
      message: 'mail sent'
    }
  }
}

module.exports = AuthService;
