/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { signIn, signOut, SignInResponse } from 'next-auth/react'
import { API_ENDPOINTS, ROUTES } from '@/lib/constants/api'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResult {
  success: boolean
  error?: string
}

/**
 * Login user with credentials
 */
export async function loginUser(credentials: LoginCredentials): Promise<LoginResult> {
  try {
    const result: SignInResponse | undefined = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    })

    if (result?.error) {
      return {
        success: false,
        error: 'Invalid credentials. Please try again.',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'An error occurred. Please try again.',
    }
  }
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut({ callbackUrl: ROUTES.LOGIN })
  } catch (error) {
    console.error('Logout error:', error)
  }
}
