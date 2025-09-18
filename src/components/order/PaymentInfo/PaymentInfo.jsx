import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './PaymentInfo.module.css';
import { paymentSchema } from './paymentSchema';
import Select from 'react-select';
import Cleave from 'cleave.js/react';
import { useFormContext as useSharedForm } from "@/hooks/useFormContext";

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

const Option = (props) => (
  <div {...props.innerProps} className={styles.customOption}>
    <div className={styles.optionContent}>
      <span className={styles.optionIcon}>{props.data.icon}</span>
      <span className={styles.optionLabel}>{props.data.label}</span>
      {props.data.details && <span className={styles.optionDetails}>{props.data.details}</span>}
    </div>
  </div>
);

const SingleValue = ({ data }) => (
  <div className={styles.singleValueContent}>
    <span className={styles.optionIcon}>{data.icon}</span>
    <span className={styles.optionLabel}>{data.label}</span>
    {data.details && <span className={styles.optionDetails}>{data.details}</span>}
  </div>
);
export default function PaymentForm() {
      const { formData, updateField } = useSharedForm();

  const { control, watch, formState: { errors } } = useForm({
    resolver: yupResolver(paymentSchema),
   defaultValues: formData.payment || {
      paymentMethod: paymentOptions[0],
      cardDetails: { cardName: '', cardNumber: '', expireDate: '', cvc: '' },
      saveCard: false,
      orderNotes: '',
    },
  });
const watchedFields = watch();
useEffect(() => {
    const handler = setTimeout(() => {
      updateField('paymentInfo', watchedFields);
    }, 200);

    return () => clearTimeout(handler);
  }, [watchedFields, updateField]);

  return (
    <div className={styles.container}>
      <form  className={styles.form}>
        <div className={styles.header}>
          <span className={styles.tableTitle}>Payment Information</span>
        </div> 
        
        <div className={styles.formContent}>
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
                    placeholder="Name on the card"
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
                  <Cleave 
                    {...field} 
                   options={{ creditCard: true }}
      className={styles.input}
      placeholder="**** **** **** ****"
      onChange={(e) => field.onChange(e.target.value)}
                  >
                  </Cleave>
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
                  <Cleave
                    
                    {...field} 
                     options={{ date: true, datePattern: ['m', 'y'] }}
      className={styles.input}
      placeholder="MM/YY"
      onChange={(e) => field.onChange(e.target.value)}
                  >
                  </Cleave>
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
                    <Cleave 
                      {...field} 
                       options={{ numericOnly: true, blocks: [3] }}
      className={styles.input}
      placeholder="•••"
      onChange={(e) => field.onChange(e.target.value)}
                    >
                    </Cleave>
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

