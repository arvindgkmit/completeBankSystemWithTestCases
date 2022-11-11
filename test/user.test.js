const app = require("../index");
const request = require("supertest");
const testDB = require("./testDB");
let db;

beforeAll(() => {
  testDB();
});
afterAll(() => {
  testDB.sequelize.close();
});

let adminToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.C6LZjUTNmJ4Fvm5Q836_E14NmcTH2k81AzXhh5kI-Vg";
let userToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjN9.qQ-gLV0wf6i12o0Zv3oVnKQgwFgGm-6flYAWoRApApI";

// create user test cases
describe("create user test cases", () => {
  it("tests /api/users Creating user success", async () => {
    const response = await request(app)
      .post("/api/users")
      .auth(adminToken, { type: "bearer" })
      .send({
        name: "name",
        email: "newuser1@gmail.com",
        password: "name",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "user created successfully",
    });
  });

  it("tests /api/users Creating user unautherized", async () => {
    const response = await request(app)
      .post("/api/users")
      .auth(userToken, { type: "bearer" })
      .send({
        name: "name",
        email: "name@gmail.com",
        password: "name",
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Manager access required",
    });
  });

  it("tests /api/users Creating user with incorrect email", async () => {
    const response = await request(app)
      .post("/api/users")
      .auth(adminToken, { type: "bearer" })
      .send({
        name: "name",
        email: "namegmail.com",
        password: "name",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please enter vaild email",
    });
  });

  it("tests /api/users Creating duplicate user ", async () => {
    const response = await request(app)
      .post("/api/users")
      .auth(adminToken, { type: "bearer" })
      .send({
        name: "name",
        email: "name@gmail.com",
        password: "name",
      });
    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({
      message: "user is already exist",
    });
  });

  it("tests /api/users Creating user with empty name, email and password", async () => {
    const response = await request(app)
      .post("/api/users")
      .auth(adminToken, { type: "bearer" })
      .send({
        name: "",
        email: "name@gmail.com",
        password: "name",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please provide all required fields",
    });
  });

  it("tests /api/users Creating user without login", async () => {
    const response = await request(app).post("/api/users").send({
      name: "name",
      email: "nameuser@gmail.com",
      password: "name",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });
});

// login user test cases
describe("user login test cases", () => {
  it("tests /api/login login successfuly", async () => {
    const response = await request(app).post("/api/login").send({
      email: "name@gmail.com",
      password: "name",
    });
    expect(response.statusCode).toBe(200);
  });

  it("tests /api/login login user with wrong email", async () => {
    const response = await request(app).post("/api/login").send({
      email: "name23@gmail.com",
      password: "name",
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "user not found",
    });
  });

  it("tests /api/login login invalid password", async () => {
    const response = await request(app).post("/api/login").send({
      email: "name@gmail.com",
      password: "name456",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid Credentials",
    });
  });

  it("tests /api/login login empty password or email", async () => {
    const response = await request(app).post("/api/login").send({
      email: "name@gmail.com",
      password: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please provide all required fields and their value",
    });
  });
});

// get all users
describe("get all users", () => {
  it("tests /api/users get all  users successfully", async () => {
    const response = await request(app)
      .get("/api/users ")
      .auth(adminToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("tests /api/users get all  users unautherized", async () => {
    const response = await request(app)
      .get("/api/users")
      .auth(userToken, { type: "bearer" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Manager access required",
    });
  });

  it("tests /api/users get all  users without login", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });
});

// get single user test cases
describe("get single user", () => {
  it("tests /api/users get single  users successfully", async () => {
    const response = await request(app)
      .get("/api/users/5 ")
      .auth(adminToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("tests /api/users get single  users unautherized", async () => {
    const response = await request(app)
      .get("/api/users/5")
      .auth(userToken, { type: "bearer" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Manager access required",
    });
  });

  it("tests /api/users get single  users without login", async () => {
    const response = await request(app).get("/api/users/5");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });
});

// user logout test cases
describe("user logout test cases", () => {
  it("tests /api/logout logout  users successfully", async () => {
    const response = await request(app)
      .post("/api/logout ")
      .auth(userToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Logout Successfully",
    });
  });
});
