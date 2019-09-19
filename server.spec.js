const request = require("supertest");
const server = require("./server");

describe("Running Server", () => {
  describe("GET /", () => {
    it("returns 200 OK & type is JSON", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  describe("GET Users /", () => {
    it("returns an array of users", async () => {
      const expected = [{ name: "Adnan" }];
      const res = await request(server).get("/users");
      expect(res.body).toEqual(expect.arrayContaining(expected));
      expect(res.body.length).toEqual(3);
    });
  });
  describe("POST Users/", () => {
    it("returns user added successfully", async () => {
      const newUser = { name: "Jade" };
      const res = await request(server)
        .post("/users")
        .send(newUser);
      expect(res.status).toBe(201);
      //Retreive the user added
      const expected = [{ name: "Jade" }];
      const nextres = await request(server).get("/users");
      expect(nextres.body).toEqual(expect.arrayContaining(expected));
    });
    it("POST request checks if there is no data", async () => {
      const res = await request(server).post("/users");
      expect(res.status).toBe(401);
    });
  });
  describe("Delete a User", () => {
    it("returns user is successfully deleted and Checks new length", async () => {
      const deleteUser = { name: "Adnan" };
      const res = await request(server)
        .delete("/users")
        .send(deleteUser);

      expect(res.status).toBe(201);
      const expected = [{ name: "Adnan" }];
      const newres = await request(server).get("/users");
      expect(newres.body).toEqual(expect.not.arrayContaining(expected));
    });
    it("Delete request checks if there is no user", async () => {
      const res = await request(server).delete("/users");
      expect(res.status).toBe(401);
    });
  });
});
