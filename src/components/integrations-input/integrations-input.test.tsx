import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { integrations } from 'src/api/integrations';

import { IntegrationsInput } from './integrations-input.component';

vi.mock('src/api/integrations');

const renderComponent = () => {
  return render(<IntegrationsInput />);
};

describe('IntegrationsInput', () => {

  describe('when adding link', () => {
    beforeEach(() => {
      renderComponent();
    })

    it('shows add button', () => {
      const addButton = screen.queryByText('Add');
  
      expect(addButton).toBeInTheDocument();
    });
  
    it('shows integration type menu when clicks on add button', () => {
      const queryMenuItem = screen.queryByText('Asana ticket');
      expect(queryMenuItem).toBe(null);
  
      fireEvent.click(screen.getByText('Add'));
      const menuItem = screen.queryByText('Asana ticket');
  
      expect(menuItem).toBeInTheDocument();
    });

    it('hides integration type menu when clicks outside', () => {
      const queryMenuItem = screen.queryByText('Asana ticket');
      expect(queryMenuItem).toBe(null);
  
      fireEvent.click(screen.getByText('Add'));
      const menuItem = screen.queryByText('Asana ticket');
      fireEvent.mouseDown(document.body);
  
      expect(menuItem).not.toBeInTheDocument();
    });
  
    it('starts integration draft when clicks in menu option', () => {
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
  
      const integrationLinkInput = screen.queryByTestId('integration-link-input-asana');
      const inputField = screen.queryByLabelText('Asana ticket');
  
      expect(integrationLinkInput).toBeInTheDocument();
      expect(inputField).toBeInTheDocument();
    });
  
    it('closes integration link input when clicks outside and still shows draft', () => {
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
      fireEvent.mouseDown(document.body);
  
      const inputField = screen.queryByLabelText('Asana ticket');
  
      expect(inputField).toBe(null);
    });
  
    it('opens integration link input when clicks on dots menu of draft', () => {
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
      fireEvent.mouseDown(document.body);
      fireEvent.click(screen.getByRole('button', { name: 'link-input-button' }));
  
      const inputField = screen.queryByLabelText('Asana ticket');
  
      expect(inputField).toBeInTheDocument();
    });
  
    it('doesnt allow to save if its not a valid link', () => {
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
  
      const input = screen.getByLabelText('Asana ticket');
      fireEvent.change(input, { target: { value: 'fake-link' } });
  
      const linkButton = screen.getByRole('button', { name: 'Link' });
  
      expect(linkButton).toBeDisabled();
    });
  
    it('saves failed link when request is not successful', async () => {
      vi.spyOn(integrations, 'upsertIntegration').mockRejectedValueOnce({});
  
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
  
      const input = screen.getByLabelText('Asana ticket');
      fireEvent.change(input, { target: { value: 'https://www.spacejam.com/1996/' } });
      fireEvent.click(screen.getByRole('button', { name: 'Link' }));
  
      await waitFor(() => {
        const createdFailedItem = screen.queryByText('URL not recognized');
  
        expect(integrations.upsertIntegration).toBeCalled();
        expect(createdFailedItem).toBeInTheDocument();
      });
    });

    it('clicks on failed link and opens context menu', async () => {
      vi.spyOn(integrations, 'upsertIntegration').mockRejectedValueOnce({});
  
      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));
  
      const input = screen.getByLabelText('Asana ticket');
      fireEvent.change(input, { target: { value: 'https://www.spacejam.com/1996/' } });
      fireEvent.click(screen.getByRole('button', { name: 'Link' }));
  
      await waitFor(() => {
        const createdFailedItem = screen.getByText('URL not recognized');
        fireEvent.click(createdFailedItem);
        const menuItem = screen.queryByText('Change Url');

        expect(menuItem).toBeInTheDocument();
      });
    });
  })

  describe('when link save is successful', () => {
    const apiResult = {
      data: {
        integrationId: '123',
        metadata: {
          id: 'DSN-556',
          title: 'Design Spec',
          status: 'Done',
        },
      },
    };

    beforeEach(async () => {
      renderComponent();
      vi.spyOn(integrations, 'upsertIntegration').mockResolvedValueOnce(apiResult);

      fireEvent.click(screen.getByText('Add'));
      fireEvent.click(screen.getByText('Asana ticket'));

      const input = screen.getByLabelText('Asana ticket');
      fireEvent.change(input, { target: { value: 'https://www.spacejam.com/1996/' } });
      fireEvent.click(screen.getByRole('button', { name: 'Link' }));

      await waitFor(() => null);
    });

    it('saves successful link when request is successful', async () => {
      const createdItem = screen.queryByText(apiResult.data.metadata.id);

      expect(integrations.upsertIntegration).toBeCalled();
      expect(createdItem).toBeInTheDocument();
    });

    it('should not open context edition when clicks on successful link', async () => {
      const createdItem = screen.getByText(apiResult.data.metadata.id);
      fireEvent.click(createdItem);

      const menuItem = screen.queryByText('Change Url');
      expect(menuItem).not.toBeInTheDocument();
    });

    it('opens context edition menu when clicks on icon button', () => {
      fireEvent.click(screen.getByRole('button', { name: 'link-menu-button' }));

      const menu = screen.queryByText('Change Url');
      expect(menu).toBeInTheDocument();
    });

    it('hides context edition menu when hovers out of integration link', () => {
      fireEvent.mouseLeave(screen.getByTestId('integration-link'));
      const menu = screen.queryByText('Change Url');
      expect(menu).not.toBeInTheDocument();
    });

    it('opens integration link input when clicks on change url', () => {
      fireEvent.click(screen.getByRole('button', { name: 'link-menu-button' }));

      fireEvent.click(screen.getByText('Change Url'));
      const linkEdit = screen.queryByTestId('integration-link-input-asana');

      expect(linkEdit).toBeInTheDocument();
    });

    it('shows item again when clicking outside', () => {
      fireEvent.click(screen.getByRole('button', { name: 'link-menu-button' }));
      fireEvent.click(screen.getByText('Change Url'));

      fireEvent.mouseDown(document.body);

      const returningCreatedItem = screen.queryByText(apiResult.data.metadata.id);

      expect(returningCreatedItem).toBeInTheDocument();
    });

    it('removes item when clicks on delete integration', () => {
      fireEvent.click(screen.getByRole('button', { name: 'link-menu-button' }));

      fireEvent.click(screen.getByText('Delete integration'));
      const link = screen.queryByTestId('integration-link');

      expect(link).toBe(null);
    });
  });
});
