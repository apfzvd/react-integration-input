import cx from 'classnames';
import { useState } from 'react';
import { useOutsideClick } from 'src/commons/hooks/use-click-outside';
import { Button, Card, Input } from 'src/components';

import { integrationsInfoMap } from '../../integrations-input.consts';
import { IntegrationType } from '../../integrations-input.types';
import styles from './integration-link-input.module.css';

type IntegrationLinkInputProps = {
  integrationType: IntegrationType;
  setIntegrationLink: (value: string) => void;
  onConfirmIntegrationDetails: () => void;
  onDismiss: () => void;
  loadingConfirmation: boolean;
};

export const IntegrationLinkInput = ({
  integrationType,
  loadingConfirmation,
  setIntegrationLink,
  onConfirmIntegrationDetails,
  onDismiss,
}: IntegrationLinkInputProps) => {
  const [isEditionCardOpen, setIsEditionCardOpen] = useState(true);
  const [isLinkValid, setIsLinkValid] = useState(false);

  const { ref: editInput } = useOutsideClick(() => {
    setIsEditionCardOpen(false);
    onDismiss();
  });

  const togglEditionCard = () => {
    setIsEditionCardOpen((prev) => !prev);
  };

  const validateLink = (value: string) => {
    try {
      new URL(value);
      setIsLinkValid(true);
      return { hasError: false };
    } catch (err) {
      setIsLinkValid(false);
      return { hasError: true };
    }
  };

  const onLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirmIntegrationDetails();
  };

  return (
    <div
      data-testid={`integration-link-input-${integrationType}`}
      className={styles.container}
      ref={editInput}
    >
      {integrationsInfoMap[integrationType].logo}

      <Button
        className={styles.actionButton}
        label="link-input-button"
        onClick={togglEditionCard}
      >
        ...
      </Button>

      {isEditionCardOpen && (
        <Card className={styles.card}>
          <form className={styles.form} onSubmit={onLinkSubmit}>
            <Input
              focus
              label={integrationsInfoMap[integrationType].label}
              labelId="integration-link-input-field"
              placeholder="Paste link https://..."
              className={cx(styles.editionInput)}
              onChange={setIntegrationLink}
              validation={[validateLink]}
            />
            <Button
              className={styles.editionButton}
              loading={loadingConfirmation}
              type="submit"
              disabled={!isLinkValid}
            >
              Link
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
