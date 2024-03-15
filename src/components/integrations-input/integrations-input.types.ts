import { ReactElement } from 'react';

export enum IntegrationType {
  asana = 'asana',
  figma = 'figma',
  linear = 'linear',
  miro = 'miro',
  notion = 'notion'
};

export type IntegrationTypesInfo = {
  typeName: string;
  label: string;
  logo: ReactElement;
};

export enum IntegrationStatus {
  editing = 'editing',
  success = 'success',
  fail = 'fail',
};

export type IntegrationMetadata = {
  id: string;
  title: string;
  status?: string;
};

export type IntegrationItemDraft = {
  id: string;
  type: IntegrationType;
  status: IntegrationStatus;
};

export type IntegrationItem = IntegrationItemDraft & {
  link: string;
  metadata: IntegrationMetadata;
};
