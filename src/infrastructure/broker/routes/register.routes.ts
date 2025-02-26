export const registerRoutes = [
  {
    path: '/v1/register-ms',
    authorization: true,
    aliases: {
      'GET /tags': 'register.getTags',
      'GET /tags/:id': 'register.getTagById',
      'POST /tags': 'register.createTag',
      'PUT /tags/:id': 'register.editTag',
      'DELETE /tags/:id': 'register.deleteTag',
    },
    mappingPolicy: 'all',
    requiredPermissions: {
      'GET /tags': 'C1',
      'GET /tags/:id': 'C1',
      'POST /tags': 'C2',
      'PUT /tags/:id': 'C3',
      'DELETE /tags/:id': 'C3',
    },
    openapi: {
      security: [{ BearerAuth: [] }],
      tags: ['Cadastros'],
    },
    onBeforeCall: async (ctx: any, _route: any, req: any, res: any) => {
      await ctx.service.authorize(ctx, req, res);
      await ctx.service.checkPermission(ctx, req);
    },
    onAfterCall: async (
      ctx: any,
      route: any,
      req: any,
      res: any,
      data: any
    ) => {
      if (req.method === 'DELETE') {
        res.statusCode = 204; // No Content
        return null; // DELETE geralmente não retorna nada
      }

      if (req.method === 'POST') {
        res.statusCode = 201; // Created
      }

      return data;
    },
  },
];
