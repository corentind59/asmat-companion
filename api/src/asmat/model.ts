import mongoose, { Document, LeanDocument, Schema, ToObjectOptions } from 'mongoose';
import { EMAIL_VALIDATOR, TEL_VALIDATOR } from '../utils/validation';
import { normalizeSearchField } from '../utils/normalize';
import { toAsmatOutput } from './service';

const SchemaTypes = mongoose.SchemaTypes;

export interface Address {
  street: string;
  complement: string | null;
  zipCode: string;
  city: string;
  zone: string | null;
}

export interface Availability {
  scholar: number;
  baby: number;
}

export interface Asmat {
  firstName: string;
  lastName: string;
  address: Address;
  cellPhoneNumber: string | null;
  fixPhoneNumber: string | null;
  email: string | null;
  receptions: number | null;
  availability: Availability | null;
  lastAdhesionDate?: Date | null;
  _search?: string;
}

export interface Adhesion {
  joiningDate: Date;
  status: 'normal' | 'remind' | 'expired';
}

export type AsmatOutput = Omit<Asmat, '_search' | 'lastAdhesionDate'> & {
  adhesion: Adhesion | null
};

export type AsmatSummary = Pick<AsmatOutput, 'firstName'
  | 'lastName'
  | 'address'
  | 'fixPhoneNumber'
  | 'cellPhoneNumber'>;

export interface AsmatDocument extends Asmat, Document {
}

const AddressSchema = new Schema({
  street: {
    type: SchemaTypes.String,
    required: true
  },
  complement: {
    type: SchemaTypes.String,
    default: null
  },
  zipCode: {
    type: SchemaTypes.String,
    required: true
  },
  city: {
    type: SchemaTypes.String,
    required: true
  },
  zone: {
    type: SchemaTypes.String,
    default: null
  }
}, {
  _id: false,
  timestamps: false
});

const AvailabilitySchema = new Schema({
  scholar: {
    type: SchemaTypes.Number,
    required: true,
    min: 0
  },
  baby: {
    type: SchemaTypes.Number,
    required: true,
    min: 0
  }
}, {
  _id: false,
  timestamps: false
});

const AsmatSchema = new Schema<AsmatDocument, AsmatModel>({
  firstName: {
    type: SchemaTypes.String,
    required: true
  },
  lastName: {
    type: SchemaTypes.String,
    required: true
  },
  address: {
    type: AddressSchema,
    required: true
  },
  cellPhoneNumber: {
    type: SchemaTypes.String,
    validate: {
      validator: (value: string) => !value || TEL_VALIDATOR.test(value)
    },
    default: null
  },
  fixPhoneNumber: {
    type: SchemaTypes.String,
    validate: {
      validator: (value: string) => !value || TEL_VALIDATOR.test(value)
    },
    default: null
  },
  email: {
    type: SchemaTypes.String,
    validate: {
      validator: (value: string) => !value || EMAIL_VALIDATOR.test(value)
    },
    default: null
  },
  receptions: {
    type: SchemaTypes.Number,
    min: 0,
    default: null
  },
  availability: {
    type: AvailabilitySchema,
    default: null
  },
  lastAdhesionDate: {
    type: SchemaTypes.Date,
    default: null
  },
  _search: {
    type: SchemaTypes.String,
    index: true
  }
}, {
  toJSON: {
    transform: (doc, ret: Asmat) => toAsmatOutput(ret)
  }
});

AsmatSchema.pre<AsmatDocument>('validate', function (next) {
  if (!this.fixPhoneNumber && !this.cellPhoneNumber) {
    this.invalidate('fixPhoneNumber, cellPhoneNumber',
      `Object must at least have cell phone number or fix phone number`);
  }
  next();
});

AsmatSchema.pre<AsmatDocument>('save', function (next) {
  this._search = [
    this.firstName,
    this.lastName,
    this.cellPhoneNumber,
    this.fixPhoneNumber,
    this.address?.street,
    this.address?.city,
    this.address?.zone,
    this.email
  ].filter(f => typeof f === 'string')
    .map(f => normalizeSearchField(f as string))
    .join(',');
  next();
});

export interface AsmatModel extends mongoose.Model<AsmatDocument> {
  searchAsmatsByQuery(query: string): Promise<AsmatSummary[]>;
}

AsmatSchema.static('searchAsmatsByQuery', async function (query: string) {
  const result = await this.find({
    _search: new RegExp(`.*${normalizeSearchField(query)}.*`, 'gi')
  })
    .select('firstName lastName address fixPhoneNumber cellPhoneNumber')
    .exec();
  return result.map(document => document.toJSON());
});

export default mongoose.model<AsmatDocument, AsmatModel>('Asmat', AsmatSchema);
