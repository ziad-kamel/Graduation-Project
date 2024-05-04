import { Metadata } from 'next'
import SpeechToTextPage from './STT'
export const metadata:Metadata={
    title:"Speech To Text",
    icons: 'parrot.svg'
  }
export default function SpeechToText() {
  return (
    <SpeechToTextPage/>
  )
}
