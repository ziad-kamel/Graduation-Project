import { Metadata } from 'next'
import TextToSpeechPage from './textToSpeech'

export const metadata:Metadata={
  title:"Text To Speech",
  icons: 'parrot.svg'
}
export default function TextToSpeech() {
  return (
    <TextToSpeechPage/>
  )
}
