import { QueryInterface } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.query('CREATE EXTENSION pg_trgm;', {
    raw: true
  }),
  down: (queryInterface: QueryInterface) => queryInterface.sequelize.query('DROP EXTENSION pg_trgm;', {
    raw: true
  })
};
export default migration;
