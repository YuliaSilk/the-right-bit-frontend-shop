// FormContext.jsx
// import { createContext, useContext, useState, useEffect, useCallback } from "react";

// export const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     deliveryInfo: {},
//     paymentInfo: {}
//   });

//   const [isInitialized, setIsInitialized] = useState(false);

//   // Ініціалізація з localStorage тільки після монтування
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("formData");
//       if (saved) {
//         const parsedData = JSON.parse(saved);
//         setFormData(parsedData);
//       }
//     } catch (error) {
//       console.warn('Failed to load form data from localStorage:', error);
//     } finally {
//       setIsInitialized(true);
//     }
//   }, []);

//   // Збереження в localStorage тільки після ініціалізації
//   useEffect(() => {
//     if (!isInitialized) return;

//     try {
//       localStorage.setItem("formData", JSON.stringify(formData));
//     } catch (error) {
//       console.warn('Failed to save form data to localStorage:', error);
//     }
//   }, [formData, isInitialized]);

//   const updateField = useCallback((section, values) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         ...values,
//       },
//     }));
//   }, []);

//   const resetForm = useCallback(() => {
//     const initialData = { deliveryInfo: {}, paymentInfo: {} };
//     setFormData(initialData);
//     try {
//       localStorage.removeItem("formData");
//     } catch (error) {
//       console.warn('Failed to clear localStorage:', error);
//     }
//   }, []);

//   const submitForms = useCallback(() => {
//     console.log('Submitting all form data:', formData);
//     // Тут ваша логіка відправки даних
//     return formData;
//   }, [formData]);

//   return (
//     <FormContext.Provider value={{ 
//       formData, 
//       updateField, 
//       resetForm, 
//       submitForms,
//       isInitialized 
//     }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error('useFormContext must be used within a FormProvider');
//   }
//   return context;
// };

// FormContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : { deliveryInfo: {}, paymentInfo: {} };
    }
    return { deliveryInfo: {}, paymentInfo: {} };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const updateField = useCallback((section, values) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }));
  }, []);

  const resetForm = () => {
    setFormData({ deliveryInfo: {}, paymentInfo: {} });
    localStorage.removeItem("formData");
  };

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);
