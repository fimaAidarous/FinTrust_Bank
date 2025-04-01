import { deleteCardStart, deleteCardSuccess, deleteCardFailure } from '../../redux/cardSlice';

export const DeleteCard = (cardId) => async (dispatch) => {
  dispatch(deleteCardStart());
  try {
    const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete card');
    }

    dispatch(deleteCardSuccess(cardId));
  } catch (error) {
    dispatch(deleteCardFailure(error.message));
  }
};

export default DeleteCard;
