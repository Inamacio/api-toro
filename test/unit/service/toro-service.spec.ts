import { expect } from 'chai';
import sinon from 'sinon';
import { ToroService } from '../../../src/service/toro-service';
import { Container } from 'typescript-ioc';

describe('UNIT test in the file ../../../../src/service/toro-service.', () => {

  let sandbox: sinon.SinonSandbox;
  const toroService = Container.get(ToroService);

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Testing toService show()', async () => {
    sandbox.stub(toroService, 'getRepository').returns({
      find: () => {
        return new Promise((resolve) => {
          resolve({});
        });
      },
    });

    const result = await toroService.show();

    expect(result).to.be.deep.equal({});
  });

  it('Testing toService balance()', async () => {
    const find = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 1000,
      stocks: [],
    };
    sandbox.stub(toroService, 'getRepository').returns({
      find: () => {
        return new Promise((resolve) => {
          resolve(find);
        });
      },
      overwrite: () => {
        return new Promise((resolve) => {
          resolve(null);
        });
      },
    });

    const result = await toroService.balance({ balance: 200 });

    const expectResult = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 1200,
      stocks: [],
    };

    expect(result).to.be.deep.equal(expectResult);
  });

  it('Testing toService shares() purchase', async () => {
    const find = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 1000,
      stocks: [],
    };
    sandbox.stub(toroService, 'getRepository').returns({
      find: () => {
        return new Promise((resolve) => {
          resolve(find);
        });
      },
      overwrite: () => {
        return new Promise((resolve) => {
          resolve(null);
        });
      },
    });

    const param = {
      type: 'purchase',
      name: 'AZUL90',
      value: 10,
    };

    const result = await toroService.shares(param);

    const expectResult = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 990,
      stocks: [
        {
          name: 'AZUL90',
          value: 10,
        },
      ],
    };

    expect(result).to.be.deep.equal(expectResult);
  });

  it('Testing toService shares() sale', async () => {
    const find = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 1000,
      stocks: [
        {
          type: 'purchase',
          name: 'AZUL90',
          value: 10,
        }
      ],
    };
    sandbox.stub(toroService, 'getRepository').returns({
      find: () => {
        return new Promise((resolve) => {
          resolve(find);
        });
      },
      overwrite: () => {
        return new Promise((resolve) => {
          resolve(null);
        });
      },
    });

    const param = {
      type: 'sale',
      name: 'AZUL90',
      value: 10,
    };

    const result = await toroService.shares(param);

    const expectResult = {
      name: 'User Test',
      email: 'test@toro.com.br',
      balance: 1010,
      stocks: [],
    };

    expect(result).to.be.deep.equal(expectResult);
  });

  it('Testing toService isValidBalance() success', async () => {

    try {
      await toroService.isValidBalance(200, 200);
      expect(true).to.be.deep.equal(true);
    } catch (e) {
      expect(true).to.be.deep.equal(false);
    }
  });

  it('Testing toService isValidBalance() fail', async () => {

    try {
      await toroService.isValidBalance(100, 200);
      expect(false).to.be.deep.equal(true);
    } catch (e) {
      expect(true).to.be.deep.equal(true);
    }
  });

  it('Testing toService isValidTypeShares() success', async () => {

    try {
      await toroService.isValidTypeShares('sale');
      expect(true).to.be.deep.equal(true);
    } catch (e) {
      expect(true).to.be.deep.equal(false);
    }
  });

  it('Testing toService isValidTypeShares() fail', async () => {

    try {
      await toroService.isValidBalance('erro');
      expect(false).to.be.deep.equal(true);
    } catch (e) {
      expect(true).to.be.deep.equal(true);
    }
  });
});
