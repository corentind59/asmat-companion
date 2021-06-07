import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem, MenuProps,
  Select
} from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const CitiesMenuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: 240,
      width: 250
    }
  },
  getContentAnchorEl: () => null!
};

type Props = {
  cities: string[];
  value?: string[];
  onChange: (cities: string[]) => unknown;
};

export default function CitySelect({ cities, value = [], onChange }: Props) {
  const classes = useStyles();
  const handleCitiesChange: SelectInputProps['onChange'] = (event) => {
    const value = event.target.value as string[];
    onChange(value);
  };

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel id="asmat-list-print-city-select">Ville(s)</InputLabel>
      <Select labelId="asmat-list-print-city-select"
              multiple
              value={value}
              onChange={handleCitiesChange}
              input={<Input/>}
              renderValue={selected => (selected as string[]).join(', ')}
              MenuProps={CitiesMenuProps}>
        {cities!.sort().map(city => (
          <MenuItem key={city} value={city}>
            <Checkbox checked={value.includes(city)}/>
            <ListItemText primary={city}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
