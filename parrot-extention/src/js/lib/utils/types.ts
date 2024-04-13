export interface audioGenerationVersion {
    model_version: string
}

export const Audio_Generation_Version:audioGenerationVersion [] = [
    {model_version: "stereo-melody-large"},
    {model_version: "stereo-large"},
    {model_version: "melody-large"},
    {model_version: "encode-decode"},
    
]

export interface normalizationStrategy {
    strategy: string
}

export const Normalization_Strategy: normalizationStrategy[] = [
    {strategy: "loudness"},
    {strategy: "clip"},
    {strategy: "peak"},
    {strategy: "rms"},
]

export interface audioGenerationInputs {
    model_version: string;
    prompt: string;
    duration: number;
    normalization_strategy: string;
}

//STT


export interface STTLanguage {
    audioLanguage: string;
}

export const STT_Language: STTLanguage[] = [
    {audioLanguage:"Arabic"},
    {audioLanguage:"English"},
];


//TTS
export interface TTSModel {
    name: string; // The name of the sound model
    url: string; // The URL to the model for generating sound
  }
  
  // An array of the predefined sound models
  
  export const TTS_MODELS: TTSModel[] = [
    {
      name: "Facebook - Fastspeech2",
      url: "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
    },
  
    {
      name: "ESPnet2 - Ljspeech",
      url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
    },
  
    {
      name: "Speechbrain - Ljspeech",
      url: "https://api-inference.huggingface.co/models/speechbrain/tts-tacotron2-ljspeech",
    },
  
    {
      name: "Voicemod - Fastspeech2",
      url: "https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
    },
  ];
  