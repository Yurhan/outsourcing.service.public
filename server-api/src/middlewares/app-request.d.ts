import { Kernel } from 'inversify';
import * as express from 'express';

export interface IAppRequest extends express.Request {
  kernel: Kernel
}
