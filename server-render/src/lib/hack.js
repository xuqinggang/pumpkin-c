'use strict';

import './windowHack';
import 'application/App/store';
import nodeRequest from './request';

global.nodeRequest = nodeRequest;
