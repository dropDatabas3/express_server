class Service {
  constructor(repository) {
    this.repository = repository;
  }

  createService = async (data) => {
    try {
      const one = await this.repository.createRepository(data);
      return one;
    } catch (error) {
      throw error;
    }
  }


  readService = async (cat) => {
    try {
      const all = await this.repository.readRepository(cat);
      return all;
    } catch (error) {
      throw error;
    }
  }

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginateRepository({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  }

  readOneService = async (id) => {
    try {
      const one = await this.repository.readOneRepository(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  updateService = async (id, data) => {
    try {
      const one = await this.repository.updateRepository(id, data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  destroyService = async (id) => {
    try {
      const one = await this.repository.destroyRepository(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
