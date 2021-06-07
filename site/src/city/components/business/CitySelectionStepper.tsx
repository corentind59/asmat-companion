import { FC, useState } from 'react';
import { Button, Grid, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import CitySelect from '../ui/CitySelect';
import ZoneSelect from '../ui/ZoneSelect';
import ButtonProgress from '../../../common/components/ButtonProgress';
import { Print } from '@material-ui/icons';

type Props = {
  cities: string[];
  zonesByCity: { [key: string]: string[] }
  onCitiesSelected: (cities: string[]) => unknown;
  onSubmit: (zonesByCity: { [key: string]: string[] }) => unknown;
};

const CitySelectionStepper: FC<Props> = ({
                                           cities,
                                           zonesByCity,
                                           onCitiesSelected,
                                           onSubmit
                                         }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const handleNextStep = () => setActiveStep(activeStep + 1);
  const handlePreviousStep = () => setActiveStep(activeStep - 1);

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedZonesByCity, setSelectedZonesByCity] = useState<{ [key: string]: string[] }>({});

  const handleCitiesSelected = (cities: string[]) => {
    setSelectedCities(cities);
    return onCitiesSelected(cities);
  };
  const citySelected = selectedCities.length > 0;
  const allZonesLoaded = selectedCities.length === Object.keys(zonesByCity).length
    && Object.values(zonesByCity).every(zones => !!zones);

  const handleZoneSelected = (city: string, zones: string[]) => {
    setSelectedZonesByCity(oldState => ({
      ...oldState,
      [city]: zones
    }));
  };
  const hasZoneToSelect = Object.values(zonesByCity).flat().length > 0;
  const computedSelectedZonesByCity = {
    ...zonesByCity,
    ...selectedZonesByCity
  };
  const zoneSelected = Object.entries(computedSelectedZonesByCity)
    .every(([city, selectedZones]) => selectedZones?.length > 0 || zonesByCity[city]?.length === 0);

  const handleSubmit = async () => {
    setSubmitted(true);
    await onSubmit(computedSelectedZonesByCity);
    setSubmitted(false);
  };

  return (
    <Stepper orientation="vertical" activeStep={activeStep}>
      <Step>
        <StepLabel>Choisissez la/les ville(s)</StepLabel>
        <StepContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <CitySelect cities={cities}
                          value={selectedCities}
                          onChange={handleCitiesSelected}/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonProgress type="button" variant="contained" color="primary" onClick={handleNextStep}
                              disabled={!citySelected} loading={!allZonesLoaded}>
                {() => 'Suivant'}
              </ButtonProgress>
            </Grid>
          </Grid>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Choisissez la/les zone(s)</StepLabel>
        <StepContent>
          {hasZoneToSelect ?
            <Grid container spacing={2}>
              {Object.entries(zonesByCity)
                .filter(([_, zones]) => zones?.length > 0)
                .map(([city, zones]) => (
                  <Grid item xs={12} lg={4} key={city}>
                    <ZoneSelect city={city}
                                zones={zones}
                                value={computedSelectedZonesByCity[city]}
                                onChange={zones => handleZoneSelected(city, zones)}/>
                  </Grid>
                ))}
            </Grid> :
            <Typography>Les villes choisies ne requièrent pas de sélectionner une zone.</Typography>
          }
          <Grid container spacing={2}>
            <Grid item>
              <Button type="button" variant="contained" onClick={handlePreviousStep}>
                Retour
              </Button>
            </Grid>
            <Grid item>
              <ButtonProgress type="button" variant="contained" color="secondary" onClick={handleSubmit}
                              disabled={!zoneSelected} loading={submitted}>
                {() => (
                  <>
                    <Print/>
                    Imprimer
                  </>
                )}
              </ButtonProgress>
            </Grid>
          </Grid>
        </StepContent>
      </Step>
    </Stepper>
  );
};

export default CitySelectionStepper;
