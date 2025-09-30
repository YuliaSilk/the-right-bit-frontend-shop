import * as yup from 'yup';

export const paymentSchema = yup.object().shape({
  paymentMethod: yup.string().required('Payment method is required'),
  saveCard: yup.boolean(),
  
  cardDetails: yup.object().when('paymentMethod', {
    is: 'creditCard',
    then: yup.object().shape({
      cardName: yup.string().required('Name on card is required'),
      cardNumber: yup.string()
        .matches(/^[0-9\s]+$/, 'Invalid card number')
        .min(16, 'Card number must be at least 16 digits')
        .max(19, 'Card number can have a maximum of 19 digits')
        .required('Card number is required'),
      expireDate: yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiration date')
        .required('Expiration date is required'),
      cvc: yup.string()
        .matches(/^[0-9]{3,4}$/, 'Invalid CVC')
        .required('CVC is required'),
    }),
    otherwise: yup.object().shape({})
  }),

  orderNotes: yup.string(),
});