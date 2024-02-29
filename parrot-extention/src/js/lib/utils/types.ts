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