import { Router } from 'express';
import { handle } from '@corentind/expressive';
import { getAllCities, getZonesForCity } from './controller';

const router = Router();

router.get('/cities', handle(() => getAllCities()));
router.get('/cities/:city/zones', handle(({ params: { city } }) => getZonesForCity(city)));

export const CityRoutes = router;
