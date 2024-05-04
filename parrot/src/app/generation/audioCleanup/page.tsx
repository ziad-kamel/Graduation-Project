import { Metadata } from 'next'
import AudioCleanUpPage from './audioCleanup'
export const metadata:Metadata={
  title:"Audio Cleanup",
  icons: 'parrot.svg'
}

export default function AudioCleanup() {
  return (
    <AudioCleanUpPage/>
  )
}
