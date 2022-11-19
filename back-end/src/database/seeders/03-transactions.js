module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      { debitedAccountId: 1, creditedAccountId: 2, value: 10, createdAt: new Date() },
      { debitedAccountId: 2, creditedAccountId: 1, value: 15, createdAt: new Date() },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};