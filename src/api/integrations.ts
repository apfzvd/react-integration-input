import { IntegrationMetadata } from 'src/components/integrations-input/integrations-input.types';

export const integrations = {
  upsertIntegration: async (
    integrationId: string,
    _integrationLink: string,
  ): Promise<{ data: { integrationId: string; metadata: IntegrationMetadata } }> =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          data: {
            integrationId,
            metadata: {
              id: 'DSN-556',
              title: 'Design Spec',
              status: 'In Progress',
            },
          },
        });
      }, 1000);
    }),
};
