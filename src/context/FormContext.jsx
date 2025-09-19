import { createContext, useContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : { deliveryInfo: {}, paymentInfo: {} };
    }
    return { deliveryInfo: {}, paymentInfo: {} };
  });

  const [savedCards, setSavedCards] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedCards");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Запис у localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("savedCards", JSON.stringify(savedCards));
  }, [savedCards]);

  // Оновлення поля тільки якщо зміни є
  const updateField = (section, values) => {
    setFormData((prev) => {
      const prevSection = prev[section] || {};
      const isEqual = JSON.stringify(prevSection) === JSON.stringify(values);
      if (isEqual) return prev; // нічого не робимо, щоб уникнути перерендеру
      return { ...prev, [section]: { ...values } };
    });
  };

  const addSavedCard = (card) => {
    setSavedCards((prev) => {
      if (!prev.some((c) => c.value === card.value)) {
        return [...prev, card];
      }
      return prev;
    });
  };

  const resetForm = () => {
    setFormData({ deliveryInfo: {}, paymentInfo: {} });
    localStorage.removeItem("formData");
  };

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm, addSavedCard }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
// import { createContext, useContext, useState, useEffect } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("formData");
//       return saved ? JSON.parse(saved) : { deliveryInfo: {}, paymentInfo: {} };
//     }
//     return { deliveryInfo: {}, paymentInfo: {} };
//   });

//   useEffect(() => {
//     localStorage.setItem("formData", JSON.stringify(formData));
//   }, [formData]);

//     const updateField = (section, values) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: { ...values },
//     }));
//   };
//   // const updateField = useCallback((section, values) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [section]: {
//   //       ...prev[section],
//   //       ...values,
//   //     },
//   //   }));
//   // }, []);
// const [savedCards, setSavedCards] = useState(() => {
//   if (typeof window !== "undefined") {
//     const saved = localStorage.getItem("savedCards");
//     return saved ? JSON.parse(saved) : [];
//   }
//   return [];
// });

// useEffect(() => {
//   localStorage.setItem("savedCards", JSON.stringify(savedCards));
// }, [savedCards]);

// const addSavedCard = (card) => {
//   setSavedCards(prev => {
//     if (!prev.some(c => c.value === card.value)) {
//       return [...prev, card];
//     }
//     return prev;
//   });
// };
//   const resetForm = () => {
//     setFormData({ deliveryInfo: {}, paymentInfo: {} });
//     localStorage.removeItem("formData");
//   };

//   return (
//     <FormContext.Provider value={{ formData, updateField, resetForm, addSavedCard }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useFormContext = () => useContext(FormContext);
