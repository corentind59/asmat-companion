import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuProps,
  Select
} from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ZonesMenuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: 240,
      width: 250
    }
  },
  getContentAnchorEl: () => null!
};

type Props = {
  city: string;
  zones: string[];
  value?: string[];
  onChange: (zones: string[]) => unknown;
};

export default function ZoneSelect({ city, zones, value = [], onChange }: Props) {
  const classes = useStyles();
  const handleZonesChange: SelectInputProps['onChange'] = (event) => {
    const value = event.target.value as string[];
    onChange(value);
  };
  const renderZonesValue = (values: unknown) => {
    const selectedZones = values as string[];
    if (selectedZones.length === zones.length) {
      return 'Toutes les zones';
    }
    return selectedZones.join(', ');
  };
  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel id={`asmat-list-print-${city}-zone-select`}>Zone(s) pour {city}</InputLabel>
      <Select labelId={`asmat-list-print-${city}-zone-select`}
              multiple
              value={value}
              onChange={handleZonesChange}
              input={<Input/>}
              renderValue={renderZonesValue}
              MenuProps={ZonesMenuProps}>
        {zones!.sort().map(zone => (
          <MenuItem key={zone} value={zone}>
            <Checkbox checked={value.includes(zone)}/>
            <ListItemText primary={zone}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
