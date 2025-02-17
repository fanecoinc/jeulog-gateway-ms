const routes = [
  {
    path: '/v1/users',
    aliases: {
      'GET /permissions': 'user.getPermissions',
    },
  },
];

export { routes };
