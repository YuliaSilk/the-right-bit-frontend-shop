import React, {useEffect, useMemo} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./DeliveryInfo.module.css";
import {useFormContext} from "@/hooks/useFormContext";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.ua";
import {useWatch} from "react-hook-form";

const schema = yup.object().shape({
 firstName: yup.string().required("First name is required"),
 lastName: yup.string().required("Last name is required"),
 email: yup.string().email("Invalid email address").required("Email is required"),
 phone: yup.string().required("Phone number is required"),
 country: yup.string().required("Country is required"),
 city: yup.string().required("City is required"),
 streetName: yup.string().required("Street name is required"),
 houseNumber: yup.string().required("House number is required"),
 apartmentNumber: yup.string(),
 postalCode: yup.string().required("Postal code is required"),
});

export default function DeliveryInfo() {
 const {formData, updateField} = useFormContext();
 //  const formContext = useFormContext() || {};

 const defaultValues = useMemo(() => {
  return {
   firstName: formData.deliveryInfo?.firstName || "",
   lastName: formData.deliveryInfo?.lastName || "",
   email: formData.deliveryInfo?.email || "",
   phone: formData.deliveryInfo?.phone || "",
   country: formData.deliveryInfo?.country || "",
   city: formData.deliveryInfo?.city || "",
   streetName: formData.deliveryInfo?.streetName || "",
   houseNumber: formData.deliveryInfo?.houseNumber || "",
   apartmentNumber: formData.deliveryInfo?.apartmentNumber || "",
   postalCode: formData.deliveryInfo?.postalCode || "",
  };
 }, [formData.deliveryInfo]);

 //  const defaultValues = {
 //   firstName: formData.deliveryInfo?.firstName || "",
 //   lastName: formData.deliveryInfo?.lastName || "",
 //   email: formData.deliveryInfo?.email || "",
 //   phone: formData.deliveryInfo?.phone || "",
 //   country: formData.deliveryInfo?.country || "",
 //   city: formData.deliveryInfo?.city || "",
 //   streetName: formData.deliveryInfo?.streetName || "",
 //   houseNumber: formData.deliveryInfo?.houseNumber || "",
 //   apartment: formData.deliveryInfo?.apartmentNumber || "",
 //   postalCode: formData.deliveryInfo?.postalCode || "",
 //  };

 const {
  control,
  handleSubmit,
  reset,
  formState: {errors},
 } = useForm({
  resolver: yupResolver(schema),
  defaultValues,
 });

 const watchedFields = useWatch({control});

 useEffect(() => {
  updateField("deliveryInfo", watchedFields);
 }, [watchedFields, updateField]);

 useEffect(() => {
  if (!formData.deliveryInfo || Object.keys(formData.deliveryInfo).length === 0) {
   reset(defaultValues);
  }
 }, [formData.deliveryInfo, reset, defaultValues]);
 const onSubmit = (data) => {
  console.log("Delivery submitted", data);
 };

 return (
  <div>
   <form
    onSubmit={handleSubmit(onSubmit)}
    className={styles.form}
    autoComplete="off"
   >
    <div className={styles.header}>
     <span className={styles.tableTitle}>Delivery Information</span>
    </div>

    <div className={styles.gridContainer}>
     {[
      {name: "firstName", label: "First name", required: true},
      {name: "lastName", label: "Last name", required: true},
      {name: "email", label: "Email address", required: true},
      {name: "phone", label: "Phone number", required: true, isPhone: true},
      {name: "country", label: "Country", required: true},
      {name: "city", label: "City", required: true},
      {name: "streetName", label: "Street name", required: true},
      {name: "houseNumber", label: "House number", required: true},
      {name: "apartmentNumber", label: "Apartment/Suite (Optional)", required: false},
      {name: "postalCode", label: "Postal Code", required: true},
     ].map((field) => (
      <div
       key={field.name}
       className={styles.formGroup}
      >
       <label
        htmlFor={field.name}
        className={styles.labelText}
       >
        {field.label} {field.required && <span className={styles.required}>*</span>}
       </label>
       <Controller
        name={field.name}
        control={control}
        render={({field: {onChange, value, ...rest}}) =>
         field.isPhone ? (
          <Cleave
           {...rest}
           className={styles.input}
           value={value}
           onChange={onChange}
           options={{
            phone: true,
            phoneRegionCode: "ua",
            prefix: "+380",
            noImmediatePrefix: false,
            rawValueTrimPrefix: false,
           }}
          />
         ) : (
          <input
           {...rest}
           value={value}
           onChange={onChange}
           className={styles.input}
           id={field.name}
           autoComplete="off"
          />
         )
        }
       />
       {errors[field.name] && <p className={styles.error}>{errors[field.name].message}</p>}
      </div>
     ))}
     <div className={styles.checkboxWrapper}>
      <input
       type="checkbox"
       id="different-address-checkbox"
       className={styles.checkboxInput}
      />
      <label
       htmlFor="different-address-checkbox"
       className={styles.checkboxLabel}
      >
       Ship to a different address
      </label>
     </div>
    </div>
   </form>
  </div>
 );
}
