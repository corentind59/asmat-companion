import { cityExists, getAllDistinctCities, getAllDistinctZonesForCity } from './service';
import { NotFound, Ok } from '@corentind/expressive';

export async function getAllCities() {
  const cities = await getAllDistinctCities();
  return new Ok(cities);
}

export async function getZonesForCity(city: string) {
  if (!(await cityExists(city))) {
    throw new NotFound({
      code: 'city-not-found'
    });
  }
  const zones = await getAllDistinctZonesForCity(city);
  return new Ok(zones);
}
