// Represents a sound model with its name and URL

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


/**
 * Represents the request payload for generating sound a pre-trained model.
 */

export interface TTSRequest {
    // URL of the pre-trained model to be used for sound generation.
    modelUrl: string;
    // The input text that will be used to generate the sound.
    text: string;
}