import React from 'react';
import './index.css';
import {app, App} from './App';

app.router(() => <App />);
app.start('#root');