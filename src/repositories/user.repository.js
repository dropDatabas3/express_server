import dao from "../data/dao.factory.js";
import UserDTO from "../dto/user.dto.js";

const { users } = dao

class UsersRepository {
    constructor(manager) {
      this.manager = manager;
    }
  
    createRepository = async (data) => {
      try {
        data = new UserDTO(data);
        const one = await this.manager.create(data);
        return one;
      } catch (error) {
        throw error;
      }
    }
  
  
    readRepository = async (cat) => {
      try {
        const all = await this.manager.read(cat);
        return all;
      } catch (error) {
        throw error;
      }
    }
  
    paginateRepository = async ({ filter, opts }) => {
      try {
        const all = await this.manager.paginate({ filter, opts });
        return all;
      } catch (error) {
        throw error;
      }
    }
  
    readOneRepository = async (id) => {
      try {
        const one = await this.manager.readOne(id);
        return one;
      } catch (error) {
        throw error;
      }
    }
  
    updateRepository = async (id, data) => {
      try {
        const one = await this.manager.update(id, data);
        return one;
      } catch (error) {
        throw error;
      }
    }
  
    destroyRepository = async (id) => {
      try {
        const one = await this.manager.destroy(id);
        return one;
      } catch (error) {
        throw error;
      }
    }
  }
  
  
const usersRepository = new UsersRepository(users);

export default usersRepository; 