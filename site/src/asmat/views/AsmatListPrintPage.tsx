import { Box, LinearProgress, Typography } from '@material-ui/core';
import { useMutation, useQueries, useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import { getCities, getZonesForCity } from '../../city/resources';
import { useState } from 'react';
import CitySelectionStepper from '../../city/components/business/CitySelectionStepper';
import { getAsmatsByCityAndZones } from '../services/resources';
import AsmatsPrintList from '../components/business/AsmatsPrintList';
import QueryKeys from '../../api/query-keys';

export default function AsmatListPrintPage() {
  const {
    isLoading: loadingCities,
    isError: cityError,
    data: cities
  } = useQuery(QueryKeys.GET_CITIES, getCities);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const handleCitiesSelected = (cities: string[]) => setSelectedCities(cities);

  const zoneQueries = useQueries(selectedCities.map(city => ({
    queryKey: QueryKeys.GET_ZONES_BY_CITY(city),
    queryFn: () => getZonesForCity(city)
  })));
  const isZoneError = zoneQueries.some(({ isError }) => isError);
  const zonesByCity = Object.fromEntries(zoneQueries.map(({ data }, idx) => ([selectedCities[idx], data as string[]])));

  const queryAsmats = useMutation(QueryKeys.GET_ASMATS_BY_PARAMS(zonesByCity),
    (zoneByCities: Array<[city: string, zones: string[]]>) =>
    Promise.all(zoneByCities.map(([city, zones]) => getAsmatsByCityAndZones({
      city,
      ...(zones.length > 0 && { zones })
    })))
      .then(result => result.flat()));
  const handleSubmit = async (zoneByCities: { [key: string]: string[] }) => {
    await queryAsmats.mutateAsync(Object.entries(zoneByCities));
    window.print();
    queryAsmats.reset();
  };

  return (
    <section>
      <Typography component="h2" variant="h4" className="screen-only">
        Imprimer une liste
      </Typography>
      <Box paddingTop={2} className="screen-only">
        {loadingCities ?
          <LinearProgress color="secondary"/> :
          (cityError || isZoneError) ?
            <Alert severity="error">Une erreur inattendue est survenue. Réessayez plus tard.</Alert> :
            <>
              <CitySelectionStepper cities={cities!}
                                    onCitiesSelected={handleCitiesSelected}
                                    zonesByCity={zonesByCity}
                                    onSubmit={handleSubmit}/>
            </>
        }
      </Box>
      {queryAsmats.isSuccess && <AsmatsPrintList asmats={queryAsmats.data!}/>}
    </section>
  );
}
