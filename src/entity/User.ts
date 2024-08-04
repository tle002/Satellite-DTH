import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm"
import { Subscription } from "./Subscription"

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    email!: string
  
    @Column()
    name!: string
  
    @Column()
    password!: string

    @Column()
    mobile_number!: string

    @Column()
    role!: string

    @Column()
    active!: boolean

    @OneToMany(()=> Subscription, (subscription)=> subscription.user, { cascade:true})
    subscription!: Subscription[];
  
  }