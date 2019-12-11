import { AutoWired } from 'typescript-ioc';
import lowdb from 'lowdb';
import { Client } from '../model/client-model';
import FileSync = require('lowdb/adapters/FileSync');

/**
 * Classe de acesso aos dados através do mecanismo de persistência.
 */
@AutoWired
export class Repository {
  /** db connect */
  private db: any;

  constructor() {
    this.initDatabase();
  }

  /**
   * Inicializa o banco
   */
  private async initDatabase() {
    const dbfile = 'db.json';
    const adapter = new FileSync(dbfile);
    this.db = lowdb(adapter);
  }

  /**
   * Recupera um registro com banco
   */
  public async find(): Promise<Client> {
    return this.db.get('client').value();
  }

  /**
   * Atualiza registro no banco
   * @param params dados a serem atualizados
   */
  public async overwrite(params: Object): Promise<void> {
    this.db.set('client', params).write();
  }
}
