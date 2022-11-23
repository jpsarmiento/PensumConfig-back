/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, Unique, Check} from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';

@Entity()
@Unique(['sigla', 'codigo'])
@Check('"creditos" >= 0')
@Check(`"sigla" = 'ADMI' OR "sigla" = 'AFIN' OR "sigla" = 'ANTR' OR "sigla" = 'ARQT' OR 
"sigla" = 'ARQU' OR "sigla" = 'ARTE' OR "sigla" = 'ARTI' OR "sigla" = 'AUTO' OR
"sigla" = 'BCOM' OR "sigla" = 'BIOL' OR "sigla" = 'CBCA' OR "sigla" = 'CBCC' OR
"sigla" = 'CBCO' OR "sigla" = 'CBIO' OR "sigla" = 'CBPC' OR "sigla" = 'CHNA' OR
"sigla" = 'CIDE' OR "sigla" = 'CISO' OR "sigla" = 'CONT' OR "sigla" = 'CPER' OR
"sigla" = 'CPOL' OR "sigla" = 'DADM' OR "sigla" = 'DCOM' OR "sigla" = 'DDER' OR
"sigla" = 'DECA' OR "sigla" = 'DEIN' OR "sigla" = 'DEMP' OR "sigla" = 'DENI' OR
"sigla" = 'DEPO' OR "sigla" = 'DEPR' OR "sigla" = 'DERE' OR "sigla" = 'DGGJ' OR
"sigla" = 'DGIT' OR "sigla" = 'DISE' OR "sigla" = 'DISO' OR "sigla" = 'DLIT' OR
"sigla" = 'DMIN' OR "sigla" = 'DPRO' OR "sigla" = 'DPUB' OR "sigla" = 'DPUC' OR
"sigla" = 'ECON' OR "sigla" = 'EDUC' OR "sigla" = 'EECO' OR "sigla" = 'EGOB' OR
"sigla" = 'EINT' OR "sigla" = 'EMAT' OR "sigla" = 'EMBA' OR "sigla" = 'ENEG' OR
"sigla" = 'EPAH' OR "sigla" = 'EPID' OR "sigla" = 'ESCR' OR "sigla" = 'ETRI' OR
"sigla" = 'FARH' OR "sigla" = 'ICYA' OR "sigla" = 'IDOC' OR "sigla" = 'IELE' OR
"sigla" = 'IIND' OR "sigla" = 'IMER' OR "sigla" = 'INTL' OR "sigla" = 'IQUI' OR
"sigla" = 'ISIS' OR "sigla" = 'LEGI' OR "sigla" = 'LENG' OR "sigla" = 'LITE' OR
"sigla" = 'MADM' OR "sigla" = 'MAIA' OR "sigla" = 'MART' OR "sigla" = 'MATE' OR
"sigla" = 'MBAE' OR "sigla" = 'MBIO' OR "sigla" = 'MBIT' OR "sigla" = 'MCLA' OR
"sigla" = 'MDER' OR "sigla" = 'MDIS' OR "sigla" = 'MECA' OR "sigla" = 'MECU' OR
"sigla" = 'MEDI' OR "sigla" = 'MFIN' OR "sigla" = 'MGAD' OR "sigla" = 'MGAP' OR
"sigla" = 'MGEO' OR "sigla" = 'MGIT' OR "sigla" = 'MGLO' OR "sigla" = 'MGPA' OR
"sigla" = 'MGPD' OR "sigla" = 'MGPU' OR "sigla" = 'MHAR' OR "sigla" = 'MIFI' OR
"sigla" = 'MIIA' OR "sigla" = 'MIID' OR "sigla" = 'MINE' OR "sigla" = 'MINT' OR
"sigla" = 'MISO' OR "sigla" = 'MISW' OR "sigla" = 'MLIT' OR "sigla" = 'MMER' OR
"sigla" = 'MMUS' OR "sigla" = 'MPAZ' OR "sigla" = 'MPCU' OR "sigla" = 'MPER' OR
"sigla" = 'MPET' OR "sigla" = 'MSCM' OR "sigla" = 'MSIN' OR "sigla" = 'MTRI' OR
"sigla" = 'MTRM' OR "sigla" = 'PATO' OR "sigla" = 'PEDI' OR "sigla" = 'PMED' OR
"sigla" = 'PSCL' OR "sigla" = 'PSIC' OR "sigla" = 'QUIM' OR "sigla" = 'SOCI' OR
"sigla" = 'SPUB' OR "sigla" = 'STRA' OR "sigla" = 'VICE' OR "sigla" = 'DEPI' OR 
"sigla" = 'MUSI' OR "sigla" = 'IMEC' OR "sigla" = 'IING' OR "sigla" = 'HIST' OR 
"sigla" = 'FILO' OR "sigla" = 'ICIV' OR "sigla" = 'IBIO' OR "sigla" = 'FISI' OR 
"sigla" = 'HART'`)
@Check(`"departamento" = 'ADMI' OR "departamento" = 'AFIN' OR "departamento" = 'ANTR' OR "departamento" = 'ARQT' OR 
"departamento" = 'ARQU' OR "departamento" = 'ARTE' OR "departamento" = 'ARTI' OR "departamento" = 'AUTO' OR
"departamento" = 'BCOM' OR "departamento" = 'BIOL' OR "departamento" = 'CBCA' OR "departamento" = 'CBCC' OR
"departamento" = 'CBCO' OR "departamento" = 'CBIO' OR "departamento" = 'CBPC' OR "departamento" = 'CHNA' OR
"departamento" = 'CIDE' OR "departamento" = 'CISO' OR "departamento" = 'CONT' OR "departamento" = 'CPER' OR
"departamento" = 'CPOL' OR "departamento" = 'DADM' OR "departamento" = 'DCOM' OR "departamento" = 'DDER' OR
"departamento" = 'DECA' OR "departamento" = 'DEIN' OR "departamento" = 'DEMP' OR "departamento" = 'DENI' OR
"departamento" = 'DEPO' OR "departamento" = 'DEPR' OR "departamento" = 'DERE' OR "departamento" = 'DGGJ' OR
"departamento" = 'DGIT' OR "departamento" = 'DISE' OR "departamento" = 'DISO' OR "departamento" = 'DLIT' OR
"departamento" = 'DMIN' OR "departamento" = 'DPRO' OR "departamento" = 'DPUB' OR "departamento" = 'DPUC' OR
"departamento" = 'ECON' OR "departamento" = 'EDUC' OR "departamento" = 'EECO' OR "departamento" = 'EGOB' OR
"departamento" = 'EINT' OR "departamento" = 'EMAT' OR "departamento" = 'EMBA' OR "departamento" = 'ENEG' OR
"departamento" = 'EPAH' OR "departamento" = 'EPID' OR "departamento" = 'ESCR' OR "departamento" = 'ETRI' OR
"departamento" = 'FARH' OR "departamento" = 'ICYA' OR "departamento" = 'IDOC' OR "departamento" = 'IELE' OR
"departamento" = 'IIND' OR "departamento" = 'IMER' OR "departamento" = 'INTL' OR "departamento" = 'IQUI' OR
"departamento" = 'ISIS' OR "departamento" = 'LEGI' OR "departamento" = 'LENG' OR "departamento" = 'LITE' OR
"departamento" = 'MADM' OR "departamento" = 'MAIA' OR "departamento" = 'MART' OR "departamento" = 'MATE' OR
"departamento" = 'MBAE' OR "departamento" = 'MBIO' OR "departamento" = 'MBIT' OR "departamento" = 'MCLA' OR
"departamento" = 'MDER' OR "departamento" = 'MDIS' OR "departamento" = 'MECA' OR "departamento" = 'MECU' OR
"departamento" = 'MEDI' OR "departamento" = 'MFIN' OR "departamento" = 'MGAD' OR "departamento" = 'MGAP' OR
"departamento" = 'MGEO' OR "departamento" = 'MGIT' OR "departamento" = 'MGLO' OR "departamento" = 'MGPA' OR
"departamento" = 'MGPD' OR "departamento" = 'MGPU' OR "departamento" = 'MHAR' OR "departamento" = 'MIFI' OR
"departamento" = 'MIIA' OR "departamento" = 'MIID' OR "departamento" = 'MINE' OR "departamento" = 'MINT' OR
"departamento" = 'MISO' OR "departamento" = 'MISW' OR "departamento" = 'MLIT' OR "departamento" = 'MMER' OR
"departamento" = 'MMUS' OR "departamento" = 'MPAZ' OR "departamento" = 'MPCU' OR "departamento" = 'MPER' OR
"departamento" = 'MPET' OR "departamento" = 'MSCM' OR "departamento" = 'MSIN' OR "departamento" = 'MTRI' OR
"departamento" = 'MTRM' OR "departamento" = 'PATO' OR "departamento" = 'PEDI' OR "departamento" = 'PMED' OR
"departamento" = 'PSCL' OR "departamento" = 'PSIC' OR "departamento" = 'QUIM' OR "departamento" = 'SOCI' OR
"departamento" = 'SPUB' OR "departamento" = 'STRA' OR "departamento" = 'VICE' OR "departamento" = 'DEPI' OR 
"departamento" = 'MUSI' OR "departamento" = 'IMEC' OR "departamento" = 'IING' OR "departamento" = 'FILO' OR 
"departamento" = 'HIST' OR "departamento" = 'ICIV' OR "departamento" = 'IBIO' OR "departamento" = 'FISI' OR 
"departamento" = 'HART'`)

export class CursoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 sigla: string;

 @Column()
 codigo: string;
 
 @Column()
 creditos: number;

 @Column()
 departamento: string;

 @Column()
 es_epsilon: boolean;

 @Column()
 es_tipo_e: boolean;

 @ManyToMany(()=> TerminoEntity, termino => termino.cursos)
 terminos: TerminoEntity[];
}