import { request } from '../../api/request';
import { AsmatSummary } from '../models/asmat';

export function searchAsmats(query: string) {
  return request<AsmatSummary[]>(`/asmats/search?q=${query}`);
}
