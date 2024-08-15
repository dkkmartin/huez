export interface Root {
  errors: any[]
  data: Daum[]
}

export interface Daum {
  id: string
  id_v1: string
  owner: Owner
  metadata: Metadata
  product_data: ProductData
  identify: Identify
  service_id: number
  on: On
  dimming: Dimming
  dimming_delta: DimmingDelta
  color_temperature: ColorTemperature
  color_temperature_delta: ColorTemperatureDelta
  color: Color
  dynamics: Dynamics
  alert: Alert
  signaling: Signaling
  mode: string
  effects: Effects
  powerup: Powerup
  type: string
}

export interface Owner {
  rid: string
  rtype: string
}

export interface Metadata {
  name: string
  archetype: string
  function: string
}

export interface ProductData {
  function: string
}

export interface Identify {}

export interface On {
  on: boolean
}

export interface Dimming {
  brightness: number
  min_dim_level: number
}

export interface DimmingDelta {}

export interface ColorTemperature {
  mirek: any
  mirek_valid: boolean
  mirek_schema: MirekSchema
}

export interface MirekSchema {
  mirek_minimum: number
  mirek_maximum: number
}

export interface ColorTemperatureDelta {}

export interface Color {
  xy: Xy
  gamut: Gamut
  gamut_type: string
}

export interface Xy {
  x: number
  y: number
}

export interface Gamut {
  red: Red
  green: Green
  blue: Blue
}

export interface Red {
  x: number
  y: number
}

export interface Green {
  x: number
  y: number
}

export interface Blue {
  x: number
  y: number
}

export interface Dynamics {
  status: string
  status_values: string[]
  speed: number
  speed_valid: boolean
}

export interface Alert {
  action_values: string[]
}

export interface Signaling {
  signal_values: string[]
}

export interface Effects {
  status_values: string[]
  status: string
  effect_values: string[]
}

export interface Powerup {
  preset: string
  configured: boolean
  on: On2
  dimming: Dimming2
  color: Color2
}

export interface On2 {
  mode: string
  on: On3
}

export interface On3 {
  on: boolean
}

export interface Dimming2 {
  mode: string
  dimming: Dimming3
}

export interface Dimming3 {
  brightness: number
}

export interface Color2 {
  mode: string
  color_temperature: ColorTemperature2
}

export interface ColorTemperature2 {
  mirek: number
}
