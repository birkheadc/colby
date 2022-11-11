export function convertStringToNumber(s: string, min: number, max: number): number {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum+= s.charCodeAt(i) / 256.0;
  }
  const ratio = sum % 1
  return (ratio * (max - min) + min) ;
}