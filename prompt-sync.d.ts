declare module 'prompt-sync' {
  export default function(promptConfig?: any): (question: string) => string;
}