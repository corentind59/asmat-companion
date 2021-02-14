import { request } from '../../api/request';
import { Asmat, AsmatInput, AsmatSummary } from '../models/asmat';

export function searchAsmats(query: string) {
  return request<AsmatSummary[]>(`/asmats/search?q=${query}`);
}

export function getAsmatById(id: string) {
  return request<Asmat>(`/asmats/${id}`);
}

export function createAsmat(asmat: AsmatInput) {
  return request<Asmat>(`/asmats`, {
    method: 'POST',
    body: JSON.stringify(asmat),
    headers: {
      'Content-Type': 'application/json'
    }
  });
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
