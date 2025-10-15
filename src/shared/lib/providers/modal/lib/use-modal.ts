import { useDispatch, useSelector } from 'react-redux';
import { EModalStates } from '../model/modal-states.enum';

export const useModal = () => {
  const dispatch = useDispatch();

  const modalState: EModalStates = useSelector(
    (state: RootState) => state.modal.modalState,
  );

  const modalData = useSelector((state: RootState) => state.modal.modalData);

  const setModalState = (mState: EModalStates) => {
    dispatch({
      type: 'modal/setModalState',
      payload: mState,
    });
  };

  const setModalData = (mData: any) => {
    dispatch({
      type: 'modal/setModalData',
      payload: mData,
    });
  };

  return {
    modalState,
    modalData,
    setModalState,
    setModalData,
  };
};
