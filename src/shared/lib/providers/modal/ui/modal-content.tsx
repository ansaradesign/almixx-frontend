import { useState } from 'react';
import { useModal } from '../lib/use-modal';
import { EModalStates } from '../model/modal-states.enum';
import { ModalVariantSubscription } from './variants/subscription';
import { ModalVariantStopAd } from './variants/stop-ad';
import { ModalVariantStartAd } from './variants/start-ad';
import { ModalVariantPromoteAd } from './variants/promote-ad';
import { ModalVariantAddPhone } from './variants/(edit-profile)/add-phone';
import { ModalVariantEditPhone } from './variants/(edit-profile)/edit-phone';
import { ModalVariantDeletePhone } from './variants/(edit-profile)/delete-phone';
import { ModalVariantEditTextField } from './variants/(edit-profile)/edit-text-field';
import { ModalVariantContactWithSeller } from './variants/contact-with-seller';
import { ModalVariantSetReview } from './variants/set-review';
import { ModalVariantLocation } from './variants/location';
import { ModalVariantUserInfo } from './variants/user-info';

export const ModalContent = () => {
  const { modalState } = useModal();

  const renderContent = () => {
    switch (modalState) {
    case EModalStates.SUBSCRIPTION:
      return <ModalVariantSubscription />;
    case EModalStates.STOP_AD:
      return <ModalVariantStopAd />;
    case EModalStates.START_AD:
      return <ModalVariantStartAd />;
    case EModalStates.PROMOTE_AD:
      return <ModalVariantPromoteAd />;
    case EModalStates.EDIT_ADD_PHONE:
      return <ModalVariantAddPhone />;
    case EModalStates.EDIT_CHANGE_PHONE:
      return <ModalVariantEditPhone />;
    case EModalStates.EDIT_DELETE_PHONE:
      return <ModalVariantDeletePhone />;
    case EModalStates.EDIT_CHANGE_TEXT:
      return <ModalVariantEditTextField />;
    case EModalStates.CONTACT_WITH_SELLER:
      return <ModalVariantContactWithSeller />;
    case EModalStates.SET_REVIEW:
      return <ModalVariantSetReview />;
    case EModalStates.LOCATION:
      return <ModalVariantLocation />;
    case EModalStates.USER_INFO:
      return <ModalVariantUserInfo />;
    default:
      return null;
    }
  };

  const [content] = useState(renderContent());

  return content;
};
