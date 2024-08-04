import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channel } from "./Channel";
import { Subscription } from "./Subscription";

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @Column()
  duration!: string;

  @OneToMany(() => Channel, (channel) => channel.pack, {cascade:true})
  @JoinTable()
  channels!: Channel[];

  @OneToMany(()=>Subscription , (subscription)=> subscription.package)
  subscription!:Subscription[]


}
