export const userRoutes = [
  {
    path: '/v1/auth',
    aliases: {
      'POST /user': 'user.authUser',
    },
    openapi: {
      tags: ['Auth'],
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
      tags: ['Usuário'],
    },
    onBeforeCall: async (ctx: any, _route: any, req: any, res: any) => {
      await ctx.service.authorize(ctx, req, res);
      await ctx.service.checkPermission(ctx, req);
    },
  },
];
