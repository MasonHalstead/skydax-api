import { lazy } from 'react';

export const SandboxPage = lazy(() => import('./sandbox/SandboxPage'));
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const RegisterPage = lazy(() => import('./register/RegisterPage'));
export const PasswordPage = lazy(() => import('./password/PasswordPage'));
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
export const StrategiesPage = lazy(() => import('./strategies/StrategiesPage'));
export const BitmexPage = lazy(() => import('./bitmex/BitmexPage'));
export const ValidatePage = lazy(() => import('./validate/ValidatePage'));
