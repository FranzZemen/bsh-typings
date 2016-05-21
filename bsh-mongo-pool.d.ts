/**
 * Created by Franz on 4/30/2016.
 */
declare module 'bsh-mongo-pool' {
  import {MongosOptions} from "mongodb";
  import {Db} from "mongodb";
  
  import Promise = Q.Promise;
  export function init (mongoURL:string, options:MongosOptions): Promise<Db>;


  export function db(): Db;
}