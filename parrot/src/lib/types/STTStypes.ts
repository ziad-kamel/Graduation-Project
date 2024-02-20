
export interface STTtask {
    taskType: string;
}

export const STT_Task: STTtask[] = [
    {taskType: "transcribe"},
    {taskType:"translate"}
];

export interface STTLanguage {
    audioLanguage: string;
}

export const STT_Language: STTLanguage[] = [
    {audioLanguage: "None"},
    {audioLanguage:"arabic"},
    {audioLanguage:"chinese"},
    {audioLanguage:"dutch"},
    {audioLanguage:"english"},
    {audioLanguage:"french"},
    {audioLanguage:"galician"},
    {audioLanguage:"german"},
    {audioLanguage:"greek"},
    {audioLanguage:"italian"},
    {audioLanguage:"japanese"},
    {audioLanguage:"korean"},
    {audioLanguage:"latin"},
    {audioLanguage:"portuguese"},
    {audioLanguage:"russian"},
    {audioLanguage:"spanish"},
    {audioLanguage:"turkish"},
];
