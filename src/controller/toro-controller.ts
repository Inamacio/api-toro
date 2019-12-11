import { AutoWired, Inject } from 'typescript-ioc';
import { Accept, GET, PUT, POST, Path } from 'typescript-rest';
import { NotFoundError } from 'typescript-rest/dist/server/model/errors';
import { ToroService } from '../service/toro-service';
import { SharesParams } from '../model/client-model';

/**
 * Classe no padrão <i>Controller</i> para gerenciar as rotas de acesso ao recurso <i>Service</i>.
 */
@Path('/v1/client')
@Accept('application/json')
@AutoWired
export class ToroController {

  /**
   * instancia do service
   */
  @Inject
  private servicesService: ToroService;

  /**
   * Retorna os dados do cliente
   */
  @GET
  @Path('/')
  public async show(): Promise<Object> {

    return this.getServiceService().show();
  }

  /**
   * Retorna os dados do cliente
   */
  @PUT
  @Path('/balance')
  public async balance(res: Object): Promise<Object> {
    return this.getServiceService().balance(res);
  }

  /**
   * Retorna os dados do cliente
   */
  @PUT
  @Path('/shares')
  public async shares(res: SharesParams): Promise<Object> {
    return this.getServiceService().shares(res);
  }

  /*-------------------------------------------
   * Métodos utilitários
   *-------------------------------------------*/

  /**
   * retorna a instanca do service
   */
  protected getServiceService(): ToroService {
    return this.servicesService;
  }
}
