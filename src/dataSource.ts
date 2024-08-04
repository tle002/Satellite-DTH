import 'reflect-metadata'
import { DataSource } from "typeorm";
import { User } from './entity/User';
import { Subscription } from './entity/Subscription';
import { Package } from './entity/Package';
import { Channel } from './entity/Channel';
import dotenv from 'dotenv'
dotenv.config();
export const appDataSource= new DataSource({
type:"mysql",
host:"127.0.0.1",
username:process.env.user,
password:process.env.password,
database:process.env.database,
port:3307,
synchronize:true,
entities:[User,Subscription,Package,Channel],

})