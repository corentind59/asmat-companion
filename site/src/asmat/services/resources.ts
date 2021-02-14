import { request } from '../../api/request';
import { Asmat, AsmatCreationInput, AsmatSummary } from '../models/asmat';

export function searchAsmats(query: string) {
  return request<AsmatSummary[]>(`/asmats/search?q=${query}`);
}

export function getAsmatById(id: string) {
  return request<Asmat>(`/asmats/${id}`);
}

export function createAsmat(asmat: AsmatCreationInput) {
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

export function adhereById(id: string) {
  return request<Asmat>(`/asmats/${id}/adhere`, {
    method: 'POST'
  });
}
