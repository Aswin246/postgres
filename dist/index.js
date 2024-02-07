"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// psql -h ep-lucky-wave-13822708.us-east-2.aws.neon.tech -p 5432 -d test -U mashwinarjun
const client = new pg_1.Client({
    connectionString: "postgresql://mashwinarjun:I6ZRaF2QGfXA@ep-lucky-wave-13822708.us-east-2.aws.neon.tech/test?sslmode=require",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
      `);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
function addIntoUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query(`
INSERT INTO USERS(username, email, password) VALUES ('Aswin', 'aswin@123', '1234');
`);
    });
}
//createUsersTable();
//addIntoUsersTable();
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `select * from users where email = $1`;
            const value = [email];
            const res = yield client.query(query, value);
            console.log(res.rows);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client.end();
        }
    });
}
function createAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        yield client.query(`
  create table Address(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
  `);
    });
}
function insertUserAdderss(city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `insert into Address (user_id, city, country, street, pincode) values ($1, $2, $3, $4, $5)`;
            const values = [1, city, country, street, pincode];
            const res = yield client.query(query, values);
            console.log(res.rows[0]);
        }
        catch (error) {
            console.log(error);
        }
    });
}
insertUserAdderss("Ernakualam", "India", "Kochi", "1234");
//getUser("aswin@123");
function getUserDetailsWithAddress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await client.connect();
            const query = `
          SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
          FROM users u
          JOIN Address a ON u.id = a.user_id
          WHERE u.id = $1
      `;
            const result = yield client.query(query, [userId]);
            if (result.rows.length > 0) {
                console.log("User and address found:", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No user or address found with the given ID.");
                return null;
            }
        }
        catch (err) {
            console.error("Error during fetching user and address:", err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
console.log(getUserDetailsWithAddress("1"));
