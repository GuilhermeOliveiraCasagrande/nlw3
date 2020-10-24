import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    /* Faz uma relação de várias imagens para um orfanato */
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name:"orphanage_id"}) //Junta 
    orphanage: Orphanage
}