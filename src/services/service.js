class Service {
  constructor(manager) {
    this.manager = manager;

    /* Bindea los metodos de la clase para que puedan ser usados 
    en otros archivos sin perder el contexto "this" de la clase tambien se puede usar arrow functions */

    this.createService = this.createService.bind(this);
    this.readService = this.readService.bind(this);
    this.paginateService = this.paginateService.bind(this);
    this.readOneService = this.readOneService.bind(this);
    this.updateService = this.updateService.bind(this);
    this.destroyService = this.destroyService.bind(this);
  }

  async createService(data) {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readService(id) {
    try {
      const all = await this.manager.read(id);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async paginateService({ filter, opts }) {
    try {
      console.log("opt", { filter, opts });
      console.log(this, "this paginateService");

      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOneService(id) {
    try {
      const one = await this.manager.readOne(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async updateService(id, data) {
    try {
      const one = await this.manager.update(id, data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroyService(id) {
    try {
      const one = await this.manager.destroy(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
