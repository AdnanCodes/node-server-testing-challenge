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
});
