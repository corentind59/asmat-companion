const QueryKeys = {
  // Asmats
  ALL_ASMATS: ['GET', 'asmats'],

  GET_ASMATS_BY_QUERY: (query: string) => ['GET', 'asmats', 'search', query],
  GET_ASMATS_BY_PARAMS: (params: any) => ['GET', 'asmats', params],
  GET_ASMAT_BY_ID: (id: string) => ['GET', 'asmats', id],

  ADD_ASMAT: ['POST', 'asmats'],

  UPDATE_ASMAT: (id: string) => ['PUT', 'asmats', id],
  UPDATE_ASMAT_ADHESION: (id: string) => ['PUT', 'asmats', id, 'adhesion'],
  UPDATE_ASMAT_UNSUBSCRIPTION: (id: string) => ['PUT', 'asmats', id, 'unsubscription'],

  // Cities
  GET_CITIES: ['GET', 'cities'],
  GET_ZONES_BY_CITY: (city: string) => ['GET', 'city', city, 'zones']
};

export default QueryKeys;
