import { Metadata } from 'next'
import AudioGenerationPage from './audioGeneration'
export const metadata:Metadata={
  title:"Audio Generation",
  icons: 'parrot.svg'
}

export default function audioGeneration() {
  return (
    <AudioGenerationPage/>
  )
}
