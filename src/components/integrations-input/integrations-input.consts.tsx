import AsanaIcon from 'src/assets/icons/integrations/asana.svg?react';
import FigmaIcon from 'src/assets/icons/integrations/figma.svg?react';
import LinearIcon from 'src/assets/icons/integrations/linear.svg?react';
import MiroIcon from 'src/assets/icons/integrations/miro.svg?react';
import NotionIcon from 'src/assets/icons/integrations/notion.svg?react';
import { TagTypes } from 'src/components';

import { IntegrationType, IntegrationTypesInfo } from './integrations-input.types';

export const integrationsInfoMap: Record<IntegrationType, IntegrationTypesInfo> = {
  [IntegrationType.asana]: {
    typeName: 'Asana',
    label: 'Asana ticket',
    logo: <AsanaIcon />,
  },
  [IntegrationType.figma]: {
    typeName: 'Figma',
    label: 'Figma file',
    logo: <FigmaIcon />,
  },
  [IntegrationType.linear]: {
    typeName: 'Linear',
    label: 'Linear ticket',
    logo: <LinearIcon />,
  },
  [IntegrationType.miro]: {
    typeName: 'Miro',
    label: 'Miro board',
    logo: <MiroIcon />,
  },
  [IntegrationType.notion]: {
    typeName: 'Notion',
    label: 'Notion page',
    logo: <NotionIcon />,
  },
};

export const integrationMenuList = Object.keys(integrationsInfoMap).map((integrationType) => ({
  ...integrationsInfoMap[integrationType as IntegrationType],
  id: integrationType,
}));

export const metadateStatusMap: Record<string, TagTypes> = {
  'In Progress': 'positive' as TagTypes.positive,
};
