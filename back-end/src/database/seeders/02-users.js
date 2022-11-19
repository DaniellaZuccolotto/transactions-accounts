module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Felipe',
        password: '60d701515d7b667fd69d461e6e459ada',
        accountId: 1,
        // Gui12345
      },
      {
        username: 'Dani',
        password: 'a16c4bd28a1e57094f4d465bc0299214',
        accountId: 2,
        // Dani1234
      },
      {
        username: 'Gui',
        password: 'a16c4bd28a1e57094f4d465bc0299214',
        accountId: 3,
        // Dani1234
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};