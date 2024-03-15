import cx from 'classnames';
import { useState } from 'react';
import ChevronDownIcon from 'src/assets/icons/chevron-down.svg?react';
import DotsIcon from 'src/assets/icons/dots.svg?react';
import RefreshIcon from 'src/assets/icons/refresh.svg?react';
import TrashIcon from 'src/assets/icons/trash.svg?react';
import { Button, Menu, Tag } from 'src/components';

import { integrationsInfoMap, metadateStatusMap } from '../../integrations-input.consts';
import { IntegrationStatus, IntegrationType } from '../../integrations-input.types';
import styles from './integration-link.module.css';

type IntegrationLinkProps = {
  integrationType: IntegrationType;
  integrationStatus: IntegrationStatus;
  href: string;
  linkId?: string;
  linkTitle?: string;
  linkStatus?: string;
  onChangeUrlClick: () => void;
  onDeleteClick: () => void;
};

export const IntegrationLink = ({
  integrationType,
  integrationStatus,
  href,
  linkId,
  linkTitle,
  linkStatus,
  onChangeUrlClick,
  onDeleteClick,
}: IntegrationLinkProps) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const toggleContextMenu = () => {
    setIsContextMenuOpen((prevIsEditOpen) => !prevIsEditOpen);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const isSuccess = () => integrationStatus === IntegrationStatus.success;
  const isFailed = () => integrationStatus === IntegrationStatus.fail;
  const isEditing = () => integrationStatus === IntegrationStatus.editing;

  return (
    <div
      data-testid="integration-link"
      className={styles.container}
      onMouseLeave={closeContextMenu}
    >
      {isSuccess() && (
        <>
          <a target="_blank" href={href} className={styles.link} rel="noreferrer">
            {integrationsInfoMap[integrationType].logo}
            <span className={styles.linkId}>{linkId}</span>{' '}
            <span className={styles.linkTitle}>{linkTitle}</span>
            {linkStatus && <Tag type={metadateStatusMap[linkStatus]}>{linkStatus}</Tag>}
          </a>

          <Button
            label="link-menu-button"
            className={cx({ [styles.hiddenEdition]: !isEditing() })}
            iconButton
            onClick={toggleContextMenu}
          >
            <DotsIcon />
          </Button>
        </>
      )}

      {isFailed() && (
        <button className={styles.itemFailed} onClick={toggleContextMenu}>
          {integrationsInfoMap[integrationType].logo}
          <p>URL not recognized</p> <ChevronDownIcon />
        </button>
      )}

      <Menu
        className={cx(styles.actionsMenuContainer, { [styles.hiddenEdition]: isSuccess() })}
        title={integrationsInfoMap[integrationType].typeName}
        open={isContextMenuOpen}
        items={[
          {
            id: 'change-url',
            logo: <RefreshIcon />,
            label: 'Change Url',
            className: styles.actionsMenuItem,
            onClick: onChangeUrlClick,
          },
          {
            id: 'delete-integration',
            logo: <TrashIcon />,
            label: 'Delete integration',
            className: cx(styles.actionsMenuItem, styles.actionsMenuItemDelete),
            onClick: onDeleteClick,
          },
        ]}
      />
    </div>
  );
};
