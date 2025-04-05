import { deleteBillPaymentStart, 
  deleteBillPaymentSuccess, 
  deleteBillPaymentFailure } from '../../redux/billPaymentSlice';

export const DeleteBillPayment = (billPaymentId) => async (dispatch) => {
  dispatch(deleteBillPaymentStart());
  try {
    const response = await fetch(`http://localhost:3000/api/BillPayments/${billPaymentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete bill payment');
    }

    dispatch(deleteBillPaymentSuccess(billPaymentId));
  } catch (error) {
    dispatch(deleteBillPaymentFailure(error.message));
  }
};

export default DeleteBillPayment;
