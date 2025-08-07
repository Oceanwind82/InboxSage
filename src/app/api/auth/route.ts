import { NextRequest, NextResponse } from 'next/server'
import { signIn, signUp, signOut } from '@/utils/auth-helpers'

export async function POST(request: NextRequest) {
  try {
    const { action, email, password } = await request.json()

    switch (action) {
      case 'signin':
        const signInResult = await signIn(email, password)
        if (signInResult.error) {
          return NextResponse.json(
            { error: signInResult.error.message },
            { status: 400 }
          )
        }
        return NextResponse.json({ user: signInResult.data.user })

      case 'signup':
        const signUpResult = await signUp(email, password)
        if (signUpResult.error) {
          return NextResponse.json(
            { error: signUpResult.error.message },
            { status: 400 }
          )
        }
        return NextResponse.json({ user: signUpResult.data.user })

      case 'signout':
        const signOutResult = await signOut()
        if (signOutResult.error) {
          return NextResponse.json(
            { error: signOutResult.error.message },
            { status: 400 }
          )
        }
        return NextResponse.json({ message: 'Signed out successfully' })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
