import { request } from '../../api/request';
import { Asmat, AsmatSummary } from '../models/asmat';

export function searchAsmats(query: string) {
  return request<AsmatSummary[]>(`/asmats/search?q=${query}`);
}

export function getAsmatById(id: string) {
  return request<Asmat>(`/asmats/${id}`);
}

export function updateAsmatById(params: { id: string, asmat: Asmat }) {
  return request<Asmat>(`/asmats/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(params.asmat),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
