import { useState } from 'react';
import { ESubscriptionStates } from '../../../model/modal-states.enum';
import { ModalSubscriptionAdvantages } from './advantages';
import { ModalSubscriptionConfirmation } from './confirmation';

export const ModalVariantSubscription = () => {
  const [screen, setScreen] = useState(ESubscriptionStates.ADVANTAGES);

  const variants = {
    [ESubscriptionStates.ADVANTAGES]: (
      <ModalSubscriptionAdvantages setScreen={setScreen} />
    ),
    [ESubscriptionStates.CONFIRMATION]: (
      <ModalSubscriptionConfirmation setScreen={setScreen} />
    ),
  } as any;

  return variants[screen];
};
