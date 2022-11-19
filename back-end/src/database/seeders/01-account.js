module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      { balance: 100 },
      { balance: 100 },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};