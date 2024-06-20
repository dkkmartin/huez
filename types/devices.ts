export interface Root {
  errors: any[];
  data: Daum[];
}

export interface Daum {
  id: string;
  id_v1?: string;
  product_data: ProductData;
  metadata: Metadata;
  identify: Identify;
  services: Service[];
  type: string;
}

export interface ProductData {
  model_id: string;
  manufacturer_name: string;
  product_name: string;
  product_archetype: string;
  certified: boolean;
  software_version: string;
  hardware_platform_type?: string;
}

export interface Metadata {
  name: string;
  archetype: string;
}

export interface Identify {}

export interface Service {
  rid: string;
  rtype: string;
}
