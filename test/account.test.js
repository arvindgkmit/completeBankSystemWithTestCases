const app = require("../index");
const request = require("supertest");

let adminToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.C6LZjUTNmJ4Fvm5Q836_E14NmcTH2k81AzXhh5kI-Vg";
let userToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjN9.qQ-gLV0wf6i12o0Zv3oVnKQgwFgGm-6flYAWoRApApI";

// create user account api test cases
describe("create user account test cases", () => {
  it("tests /api/account Creating user account successfully", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        type: "current",
        userId: 3,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "accounted created successfully",
    });
  });

  it("tests /api/account Creating user account with invalid userId", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        type: "current",
        userId: 35757,
      });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "user not found",
    });
  });

  it("tests /api/account Creating user account with blank type", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        type: "",
        userId: 35757,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please provide all required fields",
    });
  });

  it("tests /api/account Creating user account with invalid type", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        type: "bchjabsbj",
        userId: 3,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please enter valid type",
    });
  });

  it("tests /api/account Creating user account without login ", async () => {
    const response = await request(app).post("/api/accounts").send({
      type: "current",
      userId: 3,
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });

  it("tests /api/account Creating user account unautherized", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: 100000016,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Manager access required",
    });
  });
});

// close user account api  test cases
describe("close user account test cases", () => {
  it("tests /api/account close user account successfully", async () => {
    const response = await request(app)
      .patch("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        accountNo: 100000019,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "account closed successfully",
    });
  });

  it("tests /api/account close user account with empty accountNo", async () => {
    const response = await request(app)
      .patch("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        accountNo: "",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please enter acountNo",
    });
  });

  it("tests /api/account close user account unautherized", async () => {
    const response = await request(app)
      .patch("/api/accounts")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: 100000016,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Manager access required",
    });
  });

  it("tests /api/account close user account with invalid accountNo", async () => {
    const response = await request(app)
      .patch("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        accountNo: 100000016023,
      });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "account not found",
    });
  });

  it("tests /api/account close user account, account already closed ", async () => {
    const response = await request(app)
      .patch("/api/accounts")
      .auth(adminToken, { type: "bearer" })
      .send({
        accountNo: 100000016,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "account is already closed",
    });
  });

  it("tests /api/account close user account without login ", async () => {
    const response = await request(app).patch("/api/accounts").send({
      accountNo: 100000016,
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });
});
