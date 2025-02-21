import {
  OpenApiMixin,
  type OpenApiMixinSettings,
  type MoleculerWebTypes,
} from '@spailybot/moleculer-auto-openapi';
import { ServiceSchema } from 'moleculer';

const OpenApiService: ServiceSchema<
  OpenApiMixinSettings & MoleculerWebTypes.RestServiceSettings
> = {
  name: 'openapi',
  mixins: [OpenApiMixin],
  settings: {
    rest: '/v1/docs',
    openApiPaths: {
      schemaPath: '/openapi.json',
      uiPath: '/openapi',
      oauth2RedirectPath: '/openapi/oauth2-redirect',
    },
    openapi: {
      info: {
        title: 'JeuLog API',
        version: '0.0.1',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  } as OpenApiMixinSettings & MoleculerWebTypes.RestServiceSettings,
};

export default OpenApiService;
