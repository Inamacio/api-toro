import * as _ from 'lodash';
import { AutoWired, Inject } from 'typescript-ioc';
import { Repository } from '../repository/respository';
import { SharesParams, Client, Shares } from '../model/client-model';
import { BusinessError } from '../utils/errors';
import { TYPE_SHARES } from '../utils/constants';

/**
 * Classe no padrão [[[Service]]] para gestão das regras de negócio
 */
@AutoWired
export class ToroService {

  /**
   * Instância do Repository
   */
  @Inject
  private repository: Repository;

  /**
   * Exibi os dados do cliente
   */
  public async show(): Promise<Client>  {
    return await this.getRepository().find();
  }

  /**
   * Exibi os dados do atualiza o saldo do cliente
   */
  public async balance(params: object): Promise<Object>  {
    const client = await this.getRepository().find();
    const newBalance = _.get(params, 'balance');

    this.isValidBalance(client.balance, newBalance);

    client.balance += newBalance;

    await this.getRepository().overwrite(client);

    return client;
  }

  /**
   * Realiza operações nas AÇÕES
   */
  public async shares(params: SharesParams): Promise<Object>  {
    const client = await this.getRepository().find();

    this.isValidTypeShares(params.type);

    const item = (TYPE_SHARES.SALE === params.type)
    ? this.removeShareInStocks(client, params) : this.addShareInStocks(client, params);

    await this.getRepository().overwrite(item);

    return item;
  }

  /*-------------------------------------------
   * Métodos utilitários
   *-------------------------------------------*/

   /**
    * Retorna a instância do Repository
    */
  protected getRepository(): Repository {
    return this.repository;
  }

  /**
   * Valida o saldo do cliente
   * @param balance
   * @param newBalance
   */
  protected isValidBalance(balance: number, newBalance: number): void {
    if (balance - (- newBalance) < 0) {
      throw new BusinessError('Balance is insufficient!');
    }
  }

  /**
   * Valida o tipo da operação
   * @param type
   */
  protected isValidTypeShares(type: string): void {
    if (!_.includes(TYPE_SHARES, type)) {
      throw new BusinessError('Type to modality is invalid!');
    }
  }

  /**
   * Adiciona uma ação a lista
   * @param client
   * @param params
   */
  protected addShareInStocks(client: Client, params: SharesParams): Client {
    this.isValidBalance(client.balance, params.value);

    const arr = client.stocks;

    arr.push({
      name: params.name,
      value: params.value,
    });

    client.balance -= params.value;
    client.stocks = arr;

    return client;
  }

  /**
   * Remove uma ação da lista
   * @param client
   * @param params
   */
  protected removeShareInStocks(client: Client, params: SharesParams): Client {
    const stocks: any = client.stocks.filter(shares => shares.name !== params.name);

    client.balance += params.value;
    client.stocks = stocks;

    return client;
  }
}
