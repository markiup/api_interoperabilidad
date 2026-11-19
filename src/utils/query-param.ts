import { Request } from 'express';

export class QueryParams {
  static buildQueryString(req: Request): string {
    const queryParams = Object.keys(req.query);
    return queryParams
      .map(
        (key) =>
          `${key}=${typeof req.query[key] === 'object' ? JSON.stringify(req.query[key]) : req.query[key]}`,
      )
      .join('&');
  }
}
