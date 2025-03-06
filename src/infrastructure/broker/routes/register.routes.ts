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
      'GET /persons': 'register.getPersons',
      'GET /persons/:id': 'register.getPersonById',
      'POST /persons': 'register.createPerson',
      'PUT /persons/:id': 'register.editPerson',
      'GET /truckTractors': 'register.getTruckTractors',
      'GET /truckTractors/:id': 'register.getTruckTractorById',
      'POST /truckTractors': 'register.createTruckTractor',
      'PUT /truckTractors/:id': 'register.editTruckTractor',
    },
    mappingPolicy: 'all',
    requiredPermissions: {
      'GET /tags': 'C1',
      'GET /tags/:id': 'C1',
      'POST /tags': 'C2',
      'PUT /tags/:id': 'C3',
      'DELETE /tags/:id': 'C3',
      'GET /persons': 'C1',
      'GET /persons/:id': 'C1',
      'POST /persons': 'C2',
      'PUT /persons/:id': 'C3',
      'GET /truckTractors': 'D1',
      'GET /truckTractors/:id': 'D1',
      'POST /truckTractors': 'D2',
      'PUT /truckTractors/:id': 'D3',
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
      _ctx: any,
      _route: any,
      req: any,
      res: any,
      data: any
    ) => {
      if (req.method === 'DELETE') {
        res.statusCode = 204;
        return null;
      }

      if (req.method === 'POST') {
        res.statusCode = 201;
      }

      return data;
    },
  },
];
