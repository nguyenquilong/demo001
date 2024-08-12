import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const resources = [...Array(5)].map((_, index) => ({
  id: faker.string.uuid(),
  name: sample([
    'Room 123',
    'Room 456',
    'Room 789',
    'Laptop',
    'Máy lạnh',
    'TV',
  ]),
  company: sample([
    'FPT Smart Cloud',
    'FPT Software',
  ]),
  code:  sample([
    'FSL01',
    'FCI02',
  ]),
  type:  sample([
    'string',
    'string',
  ]),

}));
