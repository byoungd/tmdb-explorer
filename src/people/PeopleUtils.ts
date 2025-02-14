import { MediaType } from '@/common/CommonEnums';
import { Person } from './PeopleTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPerson(value: any): value is Person {
  return value.media_type === MediaType.PERSON;
}
