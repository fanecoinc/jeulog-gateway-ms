export const registerRoutes = [
  {
    path: '/v1/register-ms',
    authorization: true,
    aliases: {
      'GET /tags': {
        action: 'register.getTags',
        openapi: { tags: ['Tags'] },
      },
      'GET /tags/:id': {
        action: 'register.getTagById',
        openapi: { tags: ['Tags'] },
      },
      'POST /tags': {
        action: 'register.createTag',
        openapi: { tags: ['Tags'] },
      },
      'PUT /tags/:id': {
        action: 'register.editTag',
        openapi: { tags: ['Tags'] },
      },
      'DELETE /tags/:id': {
        action: 'register.deleteTag',
        openapi: { tags: ['Tags'] },
      },
      'GET /persons': {
        action: 'register.getPersons',
        openapi: { tags: ['Pessoas'] },
      },
      'GET /persons/:id': {
        action: 'register.getPersonById',
        openapi: { tags: ['Pessoas'] },
      },
      'POST /persons': {
        action: 'register.createPerson',
        openapi: { tags: ['Pessoas'] },
      },
      'PUT /persons/:id': {
        action: 'register.editPerson',
        openapi: { tags: ['Pessoas'] },
      },
      'GET /truckTractors': {
        action: 'register.getTruckTractors',
        openapi: { tags: ['Cavalos'] },
      },
      'GET /truckTractors/:id': {
        action: 'register.getTruckTractorById',
        openapi: { tags: ['Cavalos'] },
      },
      'POST /truckTractors': {
        action: 'register.createTruckTractor',
        openapi: { tags: ['Cavalos'] },
      },
      'PUT /truckTractors/:id': {
        action: 'register.editTruckTractor',
        openapi: { tags: ['Cavalos'] },
      },
      'GET /carts': {
        action: 'register.getCarts',
        openapi: { tags: ['Carretas'] },
      },
      'GET /carts/:id': {
        action: 'register.getCartById',
        openapi: { tags: ['Carretas'] },
      },
      'POST /carts': {
        action: 'register.createCart',
        openapi: { tags: ['Carretas'] },
      },
      'PUT /carts/:id': {
        action: 'register.editCart',
        openapi: { tags: ['Carretas'] },
      },
      'GET /truckSets': {
        action: 'register.getTruckSets',
        openapi: { tags: ['Conjuntos (Incompleto)'] },
      },
      'GET /truckSets/:id': {
        action: 'register.getTruckSetById',
        openapi: { tags: ['Conjuntos (Incompleto)'] },
      },
      'POST /truckSets': {
        action: 'register.createTruckSet',
        openapi: { tags: ['Conjuntos (Incompleto)'] },
      },
      'PUT /truckSets/:id': {
        action: 'register.editTruckSet',
        openapi: { tags: ['Conjuntos (Incompleto)'] },
      },
      'DELETE /truckSets/:id': {
        action: 'register.deleteTruckSet',
        openapi: { tags: ['Conjuntos (Incompleto)'] },
      },
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
      'GET /carts': 'D1',
      'GET /carts/:id': 'D1',
      'POST /carts': 'D2',
      'PUT /carts/:id': 'D3',
      'GET /truckSets': 'E1',
      'GET /truckSets/:id': 'E1',
      'POST /truckSets': 'E2',
      'PUT /truckSets/:id': 'E3',
      'DELETE /truckSets/:id': 'E3',
    },
    openapi: {
      security: [{ BearerAuth: [] }],
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
