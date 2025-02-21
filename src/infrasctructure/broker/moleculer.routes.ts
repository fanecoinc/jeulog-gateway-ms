const routes = [
  {
    path: '/v1/user-ms',
    aliases: {
      'GET /permissions': 'user.getPermissions',
      'GET /permissions/:id': 'user.getPermissionById',
      'GET /roles': 'user.getRoles',
      'GET /roles/:id': 'user.getRoleById',
      'POST /roles': 'user.createRole',
      'PUT /roles/:id': 'user.editRole',
      'GET /users': 'user.getUsers',
      'GET /users/:id': 'user.getUserById',
      'POST /users': 'user.createUser',
      'PUT /users/:id': 'user.editUser',
      'PUT /users/passwordReset/:id': 'user.resetPassword',
      'POST /users/auth': 'user.authUser',
    },
  },
];

export { routes };
