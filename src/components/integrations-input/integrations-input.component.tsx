import { useState } from 'react';
import { integrations } from 'src/api/integrations';
import PlusIcon from 'src/assets/icons/plus.svg?react';
import { getRandomId } from 'src/commons/get-random-id';
import { useOutsideClick } from 'src/commons/hooks/use-click-outside';
import { Button, Menu } from 'src/components';

import { IntegrationLink } from './elements/integration-link';
import { IntegrationLinkInput } from './elements/integration-link-input';
import { integrationMenuList } from './integrations-input.consts';
import styles from './integrations-input.module.css';
import {
  IntegrationItem,
  IntegrationItemDraft,
  IntegrationStatus,
  IntegrationType,
} from './integrations-input.types';

export const IntegrationsInput = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [integrationList, setIntegrationList] = useState<
    (IntegrationItem | IntegrationItemDraft)[]
  >([]);
  const [integrationLink, setIntegrationLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentEditionInfo, setCurrentEditionInfo] = useState<{
    integrationId: string;
    prevIntegrationStatus: IntegrationStatus;
  }>();

  const { ref: integrationMenu } = useOutsideClick(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const addDraftIntegrationItem = (integrationType: IntegrationType) => {
    const newIntegration = {
      id: `${integrationType}-${getRandomId()}-draft`,
      type: integrationType,
      status: IntegrationStatus.editing,
    };

    setIntegrationList((currentlist) => [...currentlist, newIntegration]);
    setIsMenuOpen(false);
  };

  const openIntegrationEdition = (
    integrationId: string,
    prevIntegrationStatus: IntegrationStatus,
  ) => {
    setCurrentEditionInfo({ integrationId, prevIntegrationStatus });
    updateIntegrationItem(integrationId, { status: IntegrationStatus.editing });
    setIsMenuOpen(false);
  };

  const upsertIntegration = async (integrationId: string) => {
    let newIntegrationInfo;

    try {
      setLoading(true);

      const { data } = await integrations.upsertIntegration(getRandomId(), integrationLink);

      newIntegrationInfo = {
        id: data.integrationId,
        status: IntegrationStatus.success,
        link: integrationLink,
        metadata: data.metadata,
      };
    } catch (error) {
      newIntegrationInfo = {
        status: IntegrationStatus.fail,
        link: integrationLink,
      };
    } finally {
      setLoading(false);
      setCurrentEditionInfo(undefined);
    }

    updateIntegrationItem(integrationId, newIntegrationInfo);
  };

  const restorePreviousStatus = (integrationId: string) => {
    if (currentEditionInfo?.integrationId === integrationId) {
      updateIntegrationItem(integrationId, { status: currentEditionInfo?.prevIntegrationStatus });
    }
  };

  const updateIntegrationItem = (
    integrationId: string,
    integrationItemInfo: Partial<IntegrationItem>,
  ) => {
    const currentIntegrationIndex = getIntegrationItemIndex(integrationId);

    const clonedList = [...integrationList];
    clonedList[currentIntegrationIndex] = {
      ...integrationList[currentIntegrationIndex],
      ...integrationItemInfo,
    };
    setIntegrationList(clonedList);
  };

  const deleteIntegrationItem = (integrationId: string) => {
    const currentIntegrationIndex = getIntegrationItemIndex(integrationId);
    const clonedList = [...integrationList];

    clonedList.splice(currentIntegrationIndex, 1);
    setIntegrationList(clonedList);
  };

  const getIntegrationItemIndex = (integrationId: string) => {
    return integrationList.findIndex((integration) => integration.id === integrationId);
  };

  return (
    <div className={styles.inputContainer}>
      <p className={styles.label}>Integrations</p>

      <div className={styles.integrationsColumn}>
        <div className={styles.listContainer}>
          {integrationList.map((integration) => {
            return (
              <div className={styles.listItem} key={integration.id}>
                {integration.status === IntegrationStatus.editing ? (
                  <IntegrationLinkInput
                    loadingConfirmation={loading}
                    integrationType={integration.type}
                    setIntegrationLink={setIntegrationLink}
                    onConfirmIntegrationDetails={() => upsertIntegration(integration.id)}
                    onDismiss={() => restorePreviousStatus(integration.id)}
                  />
                ) : (
                  <IntegrationLink
                    integrationType={integration.type}
                    href={(integration as IntegrationItem).link}
                    integrationStatus={integration.status}
                    linkId={(integration as IntegrationItem).metadata?.id}
                    linkTitle={(integration as IntegrationItem).metadata?.title}
                    linkStatus={(integration as IntegrationItem).metadata?.status}
                    onChangeUrlClick={() =>
                      openIntegrationEdition(integration.id, integration.status)
                    }
                    onDeleteClick={() => deleteIntegrationItem(integration.id)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <Button leftIcon={<PlusIcon />} onClick={toggleMenu}>
          Add
        </Button>
        <div ref={integrationMenu}>
          <Menu
            className={styles.addIntegrationMenu}
            title="Integration"
            open={isMenuOpen}
            onClickItem={(item) => addDraftIntegrationItem(item.id as IntegrationType)}
            items={integrationMenuList}
          />
        </div>
      </div>
    </div>
  );
};
