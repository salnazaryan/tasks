import { isObject } from './';
import { IQueryParams } from '../types';

export function buildQuery(params: IQueryParams): string {
  const { skip, limit, customParams } = params;

  let query: string = `?skip=${skip}&limit=${limit}`;

  if (customParams && isObject(customParams)) {
    const keys: string[] = Object.keys(customParams);

    for (const key of keys) {
      query += `&${key}=${customParams[key]}`;
    }
  }
  return query;
}
