import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F0EBE0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Barlow, sans-serif',
    }}>
      <SignUp />
    </main>
  )
}
