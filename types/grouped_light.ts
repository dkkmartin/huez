export interface Root {
  errors: any[]
  data: Daum[]
}

export interface Daum {
  id: string
  id_v1: string
  owner: Owner
  on: On
  dimming: Dimming
  dimming_delta: DimmingDelta
  color_temperature: ColorTemperature
  color_temperature_delta: ColorTemperatureDelta
  color: Color
  alert: Alert
  signaling: Signaling
  dynamics: Dynamics
  type: string
}

export interface Owner {
  rid: string
  rtype: string
}

export interface On {
  on: boolean
}

export interface Dimming {
  brightness: number
}

export interface DimmingDelta {}

export interface ColorTemperature {}

export interface ColorTemperatureDelta {}

export interface Color {}

export interface Alert {
  action_values: string[]
}

export interface Signaling {
  signal_values: string[]
}

export interface Dynamics {}
