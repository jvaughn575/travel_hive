import React from 'react';
import './index.css';
import { App} from './App';
import { app } from "./components/app";
import user from "./models/user";
import inspiration from "./models/inspiration";

// Create model
app.model(user);
app.model(inspiration);

app.router(() => <App />);
app.start('#root');