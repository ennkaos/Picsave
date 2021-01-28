import { combineReducers } from 'redux';
import auth from "./Auth";
import posts from './posts';

export const reducers = combineReducers({ posts,auth });
