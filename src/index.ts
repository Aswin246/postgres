import { Client } from "pg";
// psql -h ep-lucky-wave-13822708.us-east-2.aws.neon.tech -p 5432 -d test -U mashwinarjun
const client = new Client({
  connectionString:
    "postgresql://mashwinarjun:I6ZRaF2QGfXA@ep-lucky-wave-13822708.us-east-2.aws.neon.tech/test?sslmode=require",
});
async function createUsersTable() {
  try {
    await client.connect();
    const result = await client.query(`
          CREATE TABLE data (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
      `);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

//createUsersTable();
async function addIntoUsersTable() {
  await client.connect();
  await client.query(`
INSERT INTO data(username, email, password) VALUES ('Aswin', 'aswin@123', '1234');
`);
  await client.end();
}

addIntoUsersTable();

// async function getUser(email: string) {
//   try {
//     await client.connect();
//     const query = `select * from users where email = $1`;
//     const value = [email];
//     const res = await client.query(query, value);
//     console.log(res.rows);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.end();
//   }
// }

// async function createAddress() {
//   await client.connect();
//   await client.query(`
//   create table Address(
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     country VARCHAR(100) NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     pincode VARCHAR(20),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//   )
//   `);
// }

// async function insertUserAdderss(
//   city: string,
//   country: string,
//   street: string,
//   pincode: string
// ) {
//   try {
//     await client.connect();

//     const query = `insert into Address (user_id, city, country, street, pincode) values ($1, $2, $3, $4, $5)`;
//     const values = [1, city, country, street, pincode];
//     const res = await client.query(query, values);

//     console.log(res.rows[0]);
//   } catch (error) {
//     console.log(error);
//   }
// }
// insertUserAdderss("Ernakualam", "India", "Kochi", "1234");
// //getUser("aswin@123");
// async function getUserDetailsWithAddress(userId: string) {
//   try {
//     // await client.connect();
//     const query = `
//           SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
//           FROM users u
//           JOIN Address a ON u.id = a.user_id
//           WHERE u.id = $1
//       `;
//     const result = await client.query(query, [userId]);

//     if (result.rows.length > 0) {
//       console.log("User and address found:", result.rows[0]);
//       return result.rows[0];
//     } else {
//       console.log("No user or address found with the given ID.");
//       return null;
//     }
//   } catch (err) {
//     console.error("Error during fetching user and address:", err);
//     throw err;
//   } finally {
//     await client.end();
//   }
// }
// console.log(getUserDetailsWithAddress("1"));
