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
    requiredPermissions: {
      'GET users': 'A1',
      'GET users/:id': 'A1',
      'POST users': 'A2',
      'PUT users/:id': 'A3',
      'GET roles': 'B1',
      'GET roles/:id': 'B1',
      'POST roles': 'B2',
      'PUT roles/:id': 'B3',
    },
    openapi: {
      security: [{ BearerAuth: [] }],
    },
    onBeforeCall: async (ctx: any, route: any, req: any, res: any) => {
      await ctx.service.authorize(ctx, req, res);
      await ctx.service.checkPermission(ctx, req);
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
