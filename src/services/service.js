class Service {
    constructor(manager) {
        this.manager = manager
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
        console.log("opt",{ filter, opts })
        console.log(this, "this paginateService")

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