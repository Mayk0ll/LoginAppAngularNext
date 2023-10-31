import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('1rrhh', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;