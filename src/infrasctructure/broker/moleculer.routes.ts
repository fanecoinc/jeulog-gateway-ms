const routes = [
  {
    path: '/v1/auth',
    aliases: {
      'POST /user': 'user.authUser',
    },
  },
  {
    path: '/v1/user-ms',
    authorization: true,
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
    },
    mappingPolicy: 'all',
    openapi: {
      security: [{ BearerAuth: [] }],
    },
  },
  {
    path: '/v1/docs',
    aliases: {
      'GET /': 'openapi.ui',
    },
    authorization: false,
  },
  {
    path: '/openapi.json',
    aliases: {
      'GET /': 'openapi.generateDocs',
    },
    authorization: false,
  },
];

export { routes };
