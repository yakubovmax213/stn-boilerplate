'use client';

import { AddCategoryFormData } from '@stn-ui/forms';
import { useModals } from '@stn-ui/modal';
import { ToastTypes, useToasts } from '@stn-ui/toasts';
import { revalidate } from '@/lib/api/actions';
import { ModalNames } from '@/modules/modals/constants';

export interface UseCreateChatCategoryInput {
  onComplete?: () => void | Promise<void>;
}

export type UseCreateChatCategoryOutput = () => void;

export const useCreateChatCategory = ({
  onComplete,
}: UseCreateChatCategoryInput = {}): UseCreateChatCategoryOutput => {
  const { openModal, closeModal } = useModals();
  const { notify } = useToasts();

  const createChatCategory = async (data: AddCategoryFormData): Promise<void> => {
    const {
      name,
      color: { value: color },
    } = data;

    await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

    await onComplete?.();

    revalidate('/');

    notify({
      type: ToastTypes.Success,
      message: 'Category created successfully',
    });

    closeModal();
  };

  const openCreateChatCategoryModal = (): void => {
    openModal({
      name: ModalNames.AddCategoryModal,
      props: {
        onSubmit: createChatCategory,
      },
    });
  };

  return openCreateChatCategoryModal;
};
