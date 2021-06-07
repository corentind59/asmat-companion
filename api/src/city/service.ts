import AsmatModel from '../asmat/model';

export async function getAllDistinctCities() {
  const docs = await AsmatModel.aggregate([
    {
      $group: {
        _id: '$address.city'
      }
    }
  ]);
  return docs.map(({ _id }) => _id);
}

export async function getAllDistinctZonesForCity(city: string) {
  const docs = await AsmatModel.aggregate([
    {
      $match: {
        'address.city': city,
        'address.zone': { $ne: null }
      }
    },
    {
      $group: {
        _id: '$address.zone'
      }
    }
  ]);
  return docs.map(({ _id }) => _id);
}

export async function cityExists(city: string) {
  const asmat = await AsmatModel.findOne({ 'address.city': city });
  return asmat !== null;
}
