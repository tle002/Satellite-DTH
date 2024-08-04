import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm"
import { User } from "./User"
import { Package } from "./Package"

  @Entity()
  export class Subscription {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    startDate!: Date
  
    @Column()
    userId!: number

    @Column()
    packId!: number

    @Column()
    duration!: string
  
    @ManyToOne(()=> User, (user)=> user.subscription)
    user!:User;
  
    @ManyToOne(()=> Package, (pack)=> pack.subscription)
    package!:Package;
  }