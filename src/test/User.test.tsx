import { UserProfileComponent } from '../User';
import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from 'react-testing-library';

import Routes from '../routes';

afterEach(cleanup);
