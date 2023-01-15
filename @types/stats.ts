export interface Stats {
  [key: string]: string | number | boolean

  pulse: number
  saturation: number
  isNoise: boolean
  isLight: boolean
}
