import { deleteLoanStart, 
  deleteLoanSuccess, deleteLoanFailure 
} from '../../redux/loanSlice';

export const DeleteLoan = (loanId) => async (dispatch) => {
  dispatch(deleteLoanStart());
  try {
    const response = await fetch(`http://localhost:3000/api/loans/${loanId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete loan');
    }

    dispatch(deleteLoanSuccess(loanId));
  } catch (error) {
    dispatch(deleteLoanFailure(error.message));
  }
};

export default DeleteLoan;