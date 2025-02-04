exports.seed = function (knex) {
  return knex('users').insert([
    {
      login: 'testuser',
      password: 'password123',
      first_name: 'Иван',
      last_name: 'Иванов',
      phone: '+7(999)-999-99-99',
      email: 'ivan@example.com',
    },
  ]).then(() => {
    return knex('bookings').insert([
      {
        user_id: 1,
        date: '2023-11-15',
        time: '19:00',
        guests: 4,
        phone: '+7(999)-999-99-99',
        status: 'new',
      },
    ]);
  });
};