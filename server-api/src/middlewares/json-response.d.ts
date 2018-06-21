import * as express from 'express';
import * as Promise from 'bluebird';

export interface IJsonResponse extends express.Response {
  jsonPromise: (data: Promise<any>) => void;
}
