
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('first_task', 'root', 'Password123#@!', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize