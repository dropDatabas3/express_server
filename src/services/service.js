class Service {
  constructor(manager) {
    this.manager = manager;
  }

  createService = async (data) => {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  readService = async (cat) => {
    try {
      const all = await this.manager.read(cat);
      return all;
    } catch (error) {
      throw error;
    }
  }

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  }

  readOneService = async (id) => {
    try {
      const one = await this.manager.readOne(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  updateService = async (id, data) => {
    try {
      const one = await this.manager.update(id, data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  destroyService = async (id) => {
    try {
      const one = await this.manager.destroy(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
