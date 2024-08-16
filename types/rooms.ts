export interface Root {
  errors: any[]
  data: Daum[]
}

export interface Daum {
  id: string
  id_v1: string
  children: Children[]
  services: Service[]
  metadata: Metadata
  type: string
}

export interface Children {
  rid: string
  rtype: string
}

export interface Service {
  rid: string
  rtype: string
}

export interface Metadata {
  name: string
  archetype: string
}
