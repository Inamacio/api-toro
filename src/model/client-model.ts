export interface Client {
  /** name string */
  name: string;
  /** email string */
  email: string;
  /** balance string */
  balance: number;
  /** stocks string */
  stocks: Array<Shares>;
}

export interface SharesParams extends Shares {
  /** type string */
  type: string;
}

export interface Shares {
  /** name string */
  name: string;
  /** value string */
  value: number;
}
