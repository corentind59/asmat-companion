import { request } from '../api/request';

export function getCities() {
  return request<string[]>('/cities');
}

export function getZonesForCity(city: string) {
  return request<string[]>(`/cities/${city}/zones`);
}
