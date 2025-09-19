import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './DeliveryInfo.module.css';
import { useFormContext } from "@/hooks/useFormContext";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.ua';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street name is required'),
  houseNumber: yup.string().required('House number is required'),
  apartment: yup.string(), 
  postalCode: yup.string().required('Postal code is required'),
});


export default function DeliveryInfo() {
//   const { formData, updateField } = useFormContext();
const formContext = useFormContext() || {};
const { formData = {}, updateField = () => {} } = formContext;

  const defaultValues = {
    firstName: formData.deliveryInfo?.firstName || '',
    lastName: formData.deliveryInfo?.lastName || '',
    email: formData.deliveryInfo?.email || '',
    phone: formData.deliveryInfo?.phone || '',
    country: formData.deliveryInfo?.country || '',
    city: formData.deliveryInfo?.city || '',
    streetName: formData.deliveryInfo?.streetName || '',
    houseNumber: formData.deliveryInfo?.houseNumber || '',
    apartmentNumber: formData.deliveryInfo?.apartmentNumber || '',
    postalCode: formData.deliveryInfo?.postalCode || '',
  };


const { control, handleSubmit, watch, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues,
});

const watchedFields = watch ();
useEffect(() => {
    updateField('deliveryInfo', watchedFields);
  }, [watchedFields, updateField]);
// useEffect(() => {
//   const handler = setTimeout(() => {
//     updateField('deliveryInfo', watchedFields); // watchedFields — це простий об’єкт полів форми
//   }, 200);

//   return () => clearTimeout(handler);
// }, [watchedFields, updateField]);
// useEffect(() => {
//     const handler = setTimeout(() => {
//       updateField('deliveryInfo', watchedFields);
//     }, 200);

//     return () => clearTimeout(handler);
//   }, [watchedFields, updateField]);
const onSubmit = (data) => {
  console.log(data);
}


  return (
    <div>
     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <span className={styles.tableTitle}>Delivery Information</span>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="firstName">First name <span className={styles.required}>*</span></label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="lastName">Last name <span className={styles.required}>*</span></label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>
        
         
        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="email">Email adress <span className={styles.required}>*</span></label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="phone">Phone number <span className={styles.required}>*</span></label>
          <Controller
  name="phone"
  control={control}
  render={({ field: { onChange, value, ...field } }) => (
    <Cleave
      {...field}
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder="+380 XX XXX XX XX"
      options={{
        phone: true,
        phoneRegionCode: 'UA',
        prefix: '+380',
        noImmediatePrefix: false,
        rawValueTrimPrefix: false
      }}
    />
  )}
/>
          {/* <Controller
            name="phone"
            control={control}
            render={({ field }) => <InputMask {...field} mask="+380 (99) 999-99-99" placeholder='+380 (__) ___-__-__' className={styles.input} />}
          /> */}
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="country">Country <span className={styles.required}>*</span></label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="city">City <span className={styles.required}>*</span></label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="streetName">Street name <span className={styles.required}>*</span></label>
          <Controller
            name="streetName"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.streetName && <p className={styles.error}>{errors.streetName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="houseNumber">House number <span className={styles.required}>*</span></label>
          <Controller
            name="houseNumber"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.houseNumber && <p className={styles.error}>{errors.houseNumber.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="apartmentNumber">Apartment/Suite  ( Optional )</label>
          <Controller
            name="apartmentNumber"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.apartmentNumber && <p className={styles.error}>{errors.apartmentNumber.message}</p>}
        </div>
        
          <div className={styles.formGroup}>
          <label className={styles.labelText} htmlFor="postalCode">Postal Code <span className={styles.required}>*</span></label>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => <input {...field} className={styles.input} />}
          />
          {errors.apartmentNumber && <p className={styles.error}>{errors.apartmentNumber.message}</p>}
          <p className={styles.labelTextReq}>Required fields <span className={styles.required}>*</span></p>
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