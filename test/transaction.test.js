const app = require("../index");
const request = require("supertest");
const testDB = require("./testDB");

let adminToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.C6LZjUTNmJ4Fvm5Q836_E14NmcTH2k81AzXhh5kI-Vg";
let userToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjN9.qQ-gLV0wf6i12o0Zv3oVnKQgwFgGm-6flYAWoRApApI";

// check transaction api test cases
describe("check all transaction api test cases", () => {
  it("tests /api/transactions get all  transaction successfully ", async () => {
    const response = await request(app)
      .get("/api/transactions")
      .auth(userToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("tests /api/transactions get all  transaction without login", async () => {
    const response = await request(app).get("/api/transactions");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "please login",
    });
  });
});

// deposit api test cases
describe("deposite ammount api  test cases ", () => {
  it("tests /api/deposit deposit  amount successfully ", async () => {
    const response = await request(app)
      .post("/api/deposit")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: 1000,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "amount deposit successfully",
    });
  });

  it("tests /api/deposit deposit with empty ammount ", async () => {
    const response = await request(app)
      .post("/api/deposit")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: "",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please provide all required fields",
    });
  });

  it("tests /api/deposit deposit invalid ammount ", async () => {
    const response = await request(app)
      .post("/api/deposit")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000003",
        amount: -10,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "invalid amount",
    });
  });

  it("tests /api/deposit deposit amount in invalid accountNo  ", async () => {
    const response = await request(app)
      .post("/api/deposit")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "10000000300",
        amount: 10,
      });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "account not found",
    });
  });

  it("tests /api/deposit deposit amount in closed accountNo  ", async () => {
    const response = await request(app)
      .post("/api/deposit")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000000",
        amount: 10,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "account is already closed",
    });
  });
});

// withdraw api test cases
describe("withdraw ammount api  test cases ", () => {
  it("tests /api/withdraw withdraw  amount successfully ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: 10,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "amount withdraw successfully",
    });
  });

  it("tests /api/withdraw withdraw  amount with empty ammount ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: "",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "please provide all required fields",
    });
  });

  it("tests /api/withdraw withdraw invalid ammount ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: -10,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "invalid amount",
    });
  });

  it("tests /api/withdraw withdraw amount in invalid accountNo  ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000000505",
        amount: 10,
      });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "account not found",
    });
  });

  it("tests /api/withdraw withdraw amount in closed accountNo  ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000000",
        amount: 10,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "account is already closed",
    });
  });

  it("tests /api/withdraw withdraw insufficent amount   ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(userToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: 10000000,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "insufficent amount",
    });
  });

  it("tests /api/withdraw withdraw unautherized user   ", async () => {
    const response = await request(app)
      .post("/api/withdraw")
      .auth(adminToken, { type: "bearer" })
      .send({
        accountNo: "100000017",
        amount: 10000000,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "invalid account no",
    });
  });
});
