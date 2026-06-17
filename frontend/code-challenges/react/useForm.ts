// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R18 — useForm (custom hook)
//
// Build a reusable form state hook. Key lesson: extract form logic into a
// custom hook so every component that needs a form gets validation, touched
// tracking, and submit handling for free — without duplicating the logic.
//
// Hook signature:
//   useForm<T extends Record<string, string>>(config: {
//     initialValues: T;
//     validate: (values: T) => Partial<Record<keyof T, string>>;
//   })
//
// Returns:
//   values        — current field values (T)
//   errors        — validation errors per field (only populated after blur/submit)
//   touched       — which fields have been blurred
//   isValid       — true if validate() returns no errors
//   handleChange  — (field: keyof T, value: string) => void
//   handleBlur    — (field: keyof T) => void  marks touched + runs validate
//   handleSubmit  — (onSubmit: (values: T) => void) => (e: React.FormEvent) => void
//                   prevents default, touches all fields, validates, calls onSubmit
//                   only if there are NO errors
//
// Run tests: npx vitest run useForm
// ─────────────────────────────────────────────────────────────────────────────
import { useState, FormEvent } from 'react';

interface FormConfig<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, string>>(config: FormConfig<T>) {
  const { initialValues, validate } = config;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  function handleChange(field: keyof T, value: string) {
    setValues(prev => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof T) {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(onSubmit: (values: T) => void) {
    return (e: FormEvent) => {
      e.preventDefault();
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>
      );
      setTouched(allTouched);
      const newErrors = validate(values);
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) onSubmit(values);
    };
  }

  const isValid = Object.keys(validate(values)).length === 0;

  return { values, errors, touched, isValid, handleChange, handleBlur, handleSubmit };
}
