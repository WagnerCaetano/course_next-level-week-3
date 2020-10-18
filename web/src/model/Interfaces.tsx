export interface OrphanageModel {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: { id: number; url: string }[];
}

export interface OrphanageParams {
  id: string;
}
