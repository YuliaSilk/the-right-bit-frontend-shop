import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './DeliveryInfo.module.css';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street name is required'),
  houseNumber: yup.string().required('House number is required'),
  apartment: yup.string(), // необов'язкове поле
  postalCode: yup.string().required('Postal code is required'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  streetName: '',
  houseNumber: '',
  apartment: '',
  postalCode: '',
};

export default function DeliveryInfo() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

const onSubmit = (data) => {
  console.log(data);
  // Тут ви можете відправити дані на сервер
}
  return (
    <div>
     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <span className={styles.tableTitle}>Delivery Information</span>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First name *</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last name *</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>
        
         
        <div className={styles.formGroup}>
          <label htmlFor="email">Email adress *</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone number *</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country *</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">City *</label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="streetName">Street name *</label>
          <Controller
            name="streetName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.streetName && <p className={styles.error}>{errors.streetName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="houseNumber">House number *</label>
          <Controller
            name="houseNumber"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.houseNumber && <p className={styles.error}>{errors.houseNumber.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="apartmentNumber">Apartment/Suite  ( Optional )</label>
          <Controller
            name="apartmentNumber"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.apartmentNumber && <p className={styles.error}>{errors.apartmentNumber.message}</p>}
        </div>
        
          <div className={styles.formGroup}>
          <label htmlFor="postalCode">Postal Code *</label>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.apartmentNumber && <p className={styles.error}>{errors.apartmentNumber.message}</p>}
        </div>
        
        <div className={styles.checkboxWrapper}>
  <input
    type="checkbox"
    id="different-address-checkbox"
    className={styles.checkboxInput}
  />
  <label htmlFor="different-address-checkbox" className={styles.checkboxLabel}>
    Ship to a different address
  </label>
</div>

      </div>
      
      
    </form>
    </div>
  )}