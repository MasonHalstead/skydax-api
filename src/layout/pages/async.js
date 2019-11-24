import { lazy } from 'react';

export const SandboxPage = lazy(() => import('./sandbox/SandboxPage'));
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
export const ValidatePage = lazy(() => import('./validate/ValidatePage'));
