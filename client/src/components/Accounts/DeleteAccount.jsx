import { deleteAccountStart, 
  deleteAccountSuccess, 
  deleteAccountFailure } from '../../redux/accountSlice';

export const DeleteAccount = (accountId) => async (dispatch) => {
  dispatch(deleteAccountStart());
  try {
    const response = await fetch(`http://localhost:3000/api/accounts/${accountId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    dispatch(deleteAccountSuccess(accountId));
  } catch (error) {
    dispatch(deleteAccountFailure(error.message));
  }
};

export default DeleteAccount;