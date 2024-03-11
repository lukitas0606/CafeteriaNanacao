const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //Requerimiento 1
    test("GET -> devuelve un status code 200 y un arreglo con 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    //Requerimiento 2
    test("DELETE -> devuelve status 404 al eliminar ID que no existe", async () => {
        const response = await request(server)
            .delete("/cafes/IDnone")
            .set("Authorization", "token");
        expect(response.status).toBe(404);
    });

    //Requerimiento 3
    test("POST -> status 201 cuando agrega un nuevo cafe", async () => {
        const response = await request(server)
            .post("/cafes")
            .send({ id: 5, nombre: "Cappuccino Vainilla" });
        expect(response.status).toBe(201);
        expect(response.body.length).toBeGreaterThan(4);
    });

    //Requerimiento 4
    test("PUT -> status 400 al actualizar con ID en los parametros distinto al del payload", async () => {
        const response = await request(server)
            .put("/cafes/6")
            .send({ id: 14, nombre: "Cafe con leche" });
        expect(response.status).toBe(400);
    });
});
