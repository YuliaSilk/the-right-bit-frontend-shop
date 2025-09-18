import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './PaymentInfo.module.css';
import { paymentSchema } from './paymentSchema';
import Select from 'react-select';

const paymentOptions = [
  { 
    value: 'credit-card', 
    label: 'Credit Card', 
    icon: '💳',
    details: '*3788' 
  },
  { 
    value: 'another-card', 
    label: 'Another Card', 
    icon: '💳', 
    details: '*1234' 
  },
  { 
    value: 'add-new', 
    label: 'Add new card', 
    icon: '➕' 
  },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #E6E6E6',
    borderRadius: '12px',
    padding: '4px 8px',
    minHeight: '48px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #00B207'
    },
    ...(state.isFocused && {
      border: '1px solid #00B207',
      '&:hover': {
        border: '1px solid #00B207'
      }
    })
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#666',
    padding: '0 8px',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    border: '1px solid #E6E6E6',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: state.isHovered ? '#F8F9FA' : 'white',
    color: '#1A1A1A',
    cursor: 'pointer',
  })
};

const Option = (props) => {
  return (
    <div {...props.innerProps} className={styles.customOption}>
      <div className={styles.optionContent}>
        <span className={styles.optionIcon}>{props.data.icon}</span>
        <span className={styles.optionLabel}>{props.data.label}</span>
        {props.data.details && (
          <span className={styles.optionDetails}>{props.data.details}</span>
        )}
      </div>
    </div>
  );
};

const SingleValue = ({ data }) => (
  <div className={styles.singleValueContent}>
    <span className={styles.optionIcon}>{data.icon}</span>
    <span className={styles.optionLabel}>{data.label}</span>
    {data.details && (
      <span className={styles.optionDetails}>{data.details}</span>
    )}
  </div>
);

export default function PaymentForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      paymentMethod: paymentOptions[0], // Default to first option
      cardDetails: {
        cardName: '',
        cardNumber: '',
        expireDate: '',
        cvc: '',
      },
      saveCard: false,
      orderNotes: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Payment Information Header */}
        <div className={styles.header}>
          <span className={styles.tableTitle}>Payment Information</span>
        </div> 
        
        <div className={styles.formContent}>
          {/* Payment Method Select */}
          <div className={styles.paymentMethodWrapper}>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={paymentOptions}
                  styles={customSelectStyles}
                  components={{ Option, SingleValue }}
                  placeholder="Select a payment method..."
                  isSearchable={false}
                />
              )}
            />
            {errors.paymentMethod && (
              <p className={styles.error}>{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* Card Details Grid */}
          <div className={styles.cardDetailsGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name on Card</label>
              <Controller
                name="cardDetails.cardName"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    className={styles.input}
                    placeholder="Adam Wilson"
                  />
                )}
              />
              {errors.cardDetails?.cardName && (
                <p className={styles.error}>{errors.cardDetails.cardName.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Card Number</label>
              <Controller
                name="cardDetails.cardNumber"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    className={styles.input}
                    placeholder="4142 4546 9887 3788"
                  />
                )}
              />
              {errors.cardDetails?.cardNumber && (
                <p className={styles.error}>{errors.cardDetails.cardNumber.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Expire Date</label>
              <Controller
                name="cardDetails.expireDate"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    className={styles.input} 
                    placeholder="08/29" 
                  />
                )}
              />
              {errors.cardDetails?.expireDate && (
                <p className={styles.error}>{errors.cardDetails.expireDate.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>CVC</label>
              <div className={styles.cvcWrapper}>
                <Controller
                  name="cardDetails.cvc"
                  control={control}
                  render={({ field }) => (
                    <input 
                      {...field} 
                      className={styles.input}
                      placeholder="•••"
                      type="password"
                    />
                  )}
                />
                <span className={styles.lockIcon}>🔒</span>
              </div>
              {errors.cardDetails?.cvc && (
                <p className={styles.error}>{errors.cardDetails.cvc.message}</p>
              )}
            </div>
          </div>
          
          {/* Save Card Checkbox */}
          <div className={styles.checkboxRow}>
            <Controller
              name="saveCard"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <label className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => onChange(e.target.checked)}
                    className={styles.checkbox}
                    {...rest}
                  />
                  <span className={styles.checkboxLabel}>Save this card</span>
                </label>
              )}
            />
            
            <button type="button" className={styles.addCardButton}>
              <span className={styles.addCardIcon}>+</span>
              Add new card
            </button>
          </div>

          {/* Additional Info Section */}
          <div className={styles.additionalInfoSection}>
            <h3 className={styles.sectionTitle}>Additional Info</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.areaLabel}>Order Notes (Optional)</label>
              <Controller
                name="orderNotes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={styles.textarea}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                )}
              />
              {errors.orderNotes && (
                <p className={styles.error}>{errors.orderNotes.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// import React from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import styles from './PaymentInfo.module.css';
// import { paymentSchema } from './paymentSchema';
// import Select from 'react-select';

// const paymentOptions = [
//   { 
//     value: 'credit-card', 
//     label: 'Credit Card', 
//     icon: '💳', // Можна використати іконку, або імпортувати компонент SVG
//     details: '*3788' 
//   },
//   { 
//     value: 'another-card', 
//     label: 'Another Card', 
//     icon: '💳', 
//     details: '*1234' 
//   },
//   { 
//     value: 'add-new', 
//     label: 'Add new card', 
//     icon: '➕' 
//   },
// ];

// const Option = (props) => {
//   return (
//     <div {...props.innerProps} className={styles.option}>
//       <span className={styles.optionIcon}>{props.data.icon}</span>
//       <span className={styles.optionLabel}>{props.data.label}</span>
//       {props.data.details && (
//         <span className={styles.optionDetails}>{props.data.details}</span>
//       )}
//     </div>
//   );
// };

// const SingleValue = (props) => {
//   return (
//     <div className={styles.singleValue}>
//       <span className={styles.optionIcon}>{props.data.icon}</span>
//       <span className={styles.optionLabel}>{props.data.label}</span>
//       {props.data.details && (
//         <span className={styles.optionDetails}>{props.data.details}</span>
//       )}
//     </div>
//   );
// };

// export default function PaymentForm() {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(paymentSchema),
//     defaultValues: {
//       paymentMethod: 'creditCard',
//       cardDetails: {
//         cardName: '',
//         cardNumber: '',
//         expireDate: '',
//         cvc: '',
//       },
//       saveCard: false,
//       orderNotes: '',
//     },
    
//   });

// const onSubmit = (data) => {
//   console.log(data);
//   // Тут ви можете відправити дані на сервер
// }
//   return (
//     <div>
//      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//     {/* Секція "Payment Information" */}
// <div className={styles.header}>
//         <span className={styles.tableTitle}>Payment Information</span>
//       </div> 
//       <div className={styles.gridContainer}> 
//        <div className={styles.formGroup}>
        
//         <Controller
//           name="paymentMethod"
//           control={control}
//           render={({ field }) => (
//            <Select
//   {...field}
//   options={paymentOptions}
//   className={styles.select}
//   classNamePrefix="react-select"
//   components={{ Option, SingleValue }}
//   placeholder="Select a payment method..."
// />
//           )}
//         />
//         {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}
//       </div>
//     <div className={styles.cardInfoGrid}>
//       <div className={styles.formGroup}>
//         <label>Name on Card</label>
//         <Controller
//           name="cardDetails.cardName"
//           control={control}
//           render={({ field }) => <input {...field} className={styles.input} />}
//         />
//         {errors.cardDetails?.cardName && <p>{errors.cardDetails.cardName.message}</p>}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Card Number</label>
//         <Controller
//           name="cardDetails.cardNumber"
//           control={control}
//           render={({ field }) => <input {...field} className={styles.input} />}
//         />
//         {errors.cardDetails?.cardNumber && <p>{errors.cardDetails.cardNumber.message}</p>}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Expire Date</label>
//         <Controller
//           name="cardDetails.expireDate"
//           control={control}
//           render={({ field }) => <input {...field} className={styles.input} placeholder="MM/YY" />}
//         />
//         {errors.cardDetails?.expireDate && <p>{errors.cardDetails.expireDate.message}</p>}
//       </div>

//       <div className={styles.formGroup}>
//         <label>CVC</label>
//         <Controller
//           name="cardDetails.cvc"
//           control={control}
//           render={({ field }) => <input {...field} className={styles.input} />}
//         />
//         {errors.cardDetails?.cvc && <p>{errors.cardDetails.cvc.message}</p>}
//       </div>
//     </div>
    
//     <div className={styles.checkboxWrapper}>
//       <Controller
//         name="saveCard"
//         control={control}
//         render={({ field: { value, onChange, ...rest } }) => (
//           <input
//             type="checkbox"
//             checked={value}
//             onChange={e => onChange(e.target.checked)}
//             {...rest}
//           />
//         )}
//       />
//       <label>Save this card</label>
//     </div>

//     {/* Секція "Additional Info" */}
//     <div className={styles.areaWrapper}>
//         <div>
//     <h2 className={styles.infoHeader}>Additional Info</h2>
        
//         </div>
//          <div className={styles.formGroup}>
//           <label className={styles.areaLabel}>Order Notes (Optional)</label>
//           <Controller
//             name="orderNotes"
//             control={control}
//             render={({ field }) => (
//               <textarea
//                 {...field}
//                 className={styles.textarea}
//                 placeholder="Notes about your order, e.g. special notes for delivery"
//               />
//             )}
//           />
//           {errors.orderNotes && <p>{errors.orderNotes.message}</p>}
//         </div>
//         </div>
// </div>  
//   </form>
//     </div>
//   )}