jest.mock("../../repositories/product.repository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    search: jest.fn()
}));

const request = require("supertest");
const app = require("../../app");
const productRepository = require("../../repositories/product.repository");

describe("GET /api/products", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns the product list", async () => {
        const products = [
            { id: 1, name: "Keyboard", price: 50, stock: 10 },
            { id: 2, name: "Mouse", price: 20, stock: 30 }
        ];
        productRepository.findAll.mockResolvedValue(products);

        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(products);
    });

    it("returns a sanitized 500 when the repository fails unexpectedly", async () => {
        productRepository.findAll.mockRejectedValue(new Error("connection lost"));

        const response = await request(app).get("/api/products");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });

});
