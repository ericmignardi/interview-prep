import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from './useForm';

const config = {
  initialValues: { email: '', password: '' },
  validate: (values: { email: string; password: string }) => {
    const errors: Partial<{ email: string; password: string }> = {};
    if (!values.email.includes('@')) errors.email = 'Invalid email';
    if (values.password.length < 6) errors.password = 'Too short';
    return errors;
  },
};

describe('useForm', () => {
  it('initialises with provided values and no errors', () => {
    const { result } = renderHook(() => useForm(config));
    expect(result.current.values).toEqual({ email: '', password: '' });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('handleChange updates the correct field', () => {
    const { result } = renderHook(() => useForm(config));
    act(() => result.current.handleChange('email', 'eric@example.com'));
    expect(result.current.values.email).toBe('eric@example.com');
    expect(result.current.values.password).toBe('');
  });

  it('handleBlur marks the field as touched and populates errors', () => {
    const { result } = renderHook(() => useForm(config));
    act(() => result.current.handleBlur('email'));
    expect(result.current.touched.email).toBe(true);
    expect(result.current.errors.email).toBe('Invalid email');
  });

  it('isValid is false when there are validation errors', () => {
    const { result } = renderHook(() => useForm(config));
    expect(result.current.isValid).toBe(false);
  });

  it('isValid is true when all fields are valid', () => {
    const { result } = renderHook(() => useForm(config));
    act(() => result.current.handleChange('email', 'eric@example.com'));
    act(() => result.current.handleChange('password', 'secret123'));
    expect(result.current.isValid).toBe(true);
  });

  it('handleSubmit does NOT call onSubmit when there are errors', () => {
    const { result } = renderHook(() => useForm(config));
    const onSubmit = vi.fn();
    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => result.current.handleSubmit(onSubmit)(fakeEvent));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  });

  it('handleSubmit calls onSubmit when all fields are valid', () => {
    const { result } = renderHook(() => useForm(config));
    const onSubmit = vi.fn();
    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => result.current.handleChange('email', 'eric@example.com'));
    act(() => result.current.handleChange('password', 'secret123'));
    act(() => result.current.handleSubmit(onSubmit)(fakeEvent));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'eric@example.com', password: 'secret123' });
  });
});
