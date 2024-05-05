import mysql, { Pool } from "mysql";
interface Resource {
  id: string;
  name: string;
  description: string;
}
interface Response {
  status: boolean;
  message: string;
}

export class Database {
  private connection: Pool = null;
  constructor() {
    this.connection = this.getConnection();
  }
  getConnection() {
    if (!this.connection) {
      this.connection = mysql.createPool({
        host: process.env.Db_Host,
        user: process.env.Db_user,
        password: process.env.Db_password,
        database: process.env.Db_database,
        connectionLimit: 2,
      });
    }
    return this.connection;
  }

  createResource(name: string, description: string): Promise<Response> {
    const id = Math.random().toString(36).substr(2, 9);
    //the id will automatic generated if not parameter
    const values = [name, description];
    return new Promise((resolve, reject) => {
      this.connection.query(
        `INSERT INTO resource (name, description) VALUES (?, ?)`,
        values,
        function (err: Error, result: any) {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: result.affectedRows > 0,
              message: "success",
            });
          }
        }
      );
    });
  }

  getResources(): Promise<Resource[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "select * from resource",
        function (err: Error, res: any) {
          if (err) {
            reject(err);
          } else {
            const resources: Resource[] = res.map((row: any) => ({
              id: row.id,
              name: row.name,
              description: row.description,
            }));
            resolve(resources);
          }
        }
      );
    });
  }
  async getResourceById(id: string): Promise<Resource | undefined> {
    try {
      const resources = await this.getResources();
      const resource = resources.find((res: Resource) => res.id == id);
      if (resource) {
        return resource;
      } else {
        return undefined; // Resource not found
      }
    } catch (error) {
      throw new Error(`Error fetching resource by ID: ${error.message}`);
    }
  }

  updateResource(
    id: string,
    name: string,
    description: string
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `UPDATE resource
        SET name = '${name}' , description= '${description}'
        WHERE id = ${id};`,
        function (err: Error, result: any) {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: result.affectedRows > 0,
              message: "success",
            });
          }
        }
      );
    });
  }

  deleteResource(id: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `DELETE FROM resource WHERE id=${id};`,
        function (err: Error, result: any) {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: result.affectedRows > 0,
              message: "success",
            });
          }
        }
      );
    });
  }
}
