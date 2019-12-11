import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Server } from 'typescript-rest';
import { ToroController } from './controller/toro-controller';
import errorHandler from './middleware/error-handler';
/**
 * ServerManager
 */
export class ServerManager {
  /**
   * Função para inicialização do serviço
   */
  public static async start() {
    try {
      // Configura a aplicação
      const app: express.Application = express();

      app.disable('x-powered-by');
      app.use(bodyParser.json());
      app.use(compression());
      app.use(errorHandler);

      Server.buildServices(app, ToroController);

      // Executa o express
      app.listen(3000, () => {
        console.info('Server listen on port 3000!');
      });
    } catch (err) {
      console.error(`Error on application startup: ${err.message}`);
      process.exit(1);
    }
  }
}
