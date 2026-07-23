jest.mock("../../repositories/cart.repository", () => ({
    findAll: jest.fn(),
    save: jest.fn(),
    findByProductId: jest.fn(),
    updateQuantity: jest.fn(),
    delete: jest.fn()
}));

jest.mock("../../repositories/product.repository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    search: jest.fn()
}));

const request = require("supertest");
const app = require("../../app");
const cartRepository = require("../../repositories/cart.repository");
const productRepository = require("../../repositories/product.repository");

const USER_ID = "test-user";

describe("Cart API", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/cart", () => {

        it("adds a product to the cart", async () => {
            productRepository.findById.mockResolvedValue(
                { id: 1, name: "Keyboard", price: 50, stock: 10 }
            );
            cartRepository.findByProductId.mockResolvedValue(undefined);

            const response = await request(app)
                .post("/api/cart")
                .set("X-USER-ID", USER_ID)
                .send({ productId: 1 });

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                productId: 1,
                name: "Keyboard",
                price: 50,
                quantity: 1
            });
            expect(cartRepository.save).toHaveBeenCalledWith(USER_ID, expect.any(Object));
        });

        it("returns 404 for a nonexistent product", async () => {
            productRepository.findById.mockResolvedValue(undefined);

            const response = await request(app)
                .post("/api/cart")
                .set("X-USER-ID", USER_ID)
                .send({ productId: 9999 });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Product not found" });
        });

        it("returns 400 when the requested quantity would exceed stock", async () => {
            productRepository.findById.mockResolvedValue(
                { id: 4, name: "Laptop", price: 1200, stock: 3 }
            );
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 4, name: "Laptop", price: 1200, quantity: 3 }
            );

            const response = await request(app)
                .post("/api/cart")
                .set("X-USER-ID", USER_ID)
                .send({ productId: 4 });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Not enough stock" });
        });

    });

    describe("PATCH /api/cart/:id", () => {

        it("updates the quantity of an existing item", async () => {
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 1, name: "Keyboard", price: 50, quantity: 1 }
            );
            productRepository.findById.mockResolvedValue(
                { id: 1, name: "Keyboard", price: 50, stock: 10 }
            );

            const response = await request(app)
                .patch("/api/cart/1")
                .set("X-USER-ID", USER_ID)
                .send({ quantity: 5 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true });
            expect(cartRepository.updateQuantity).toHaveBeenCalledWith(USER_ID, 1, 5);
        });

        it("returns 400 for an invalid (negative) quantity", async () => {
            const response = await request(app)
                .patch("/api/cart/1")
                .set("X-USER-ID", USER_ID)
                .send({ quantity: -5 });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Invalid quantity" });
        });

        it("returns 404 when the cart item does not exist", async () => {
            cartRepository.findByProductId.mockResolvedValue(undefined);

            const response = await request(app)
                .patch("/api/cart/9999")
                .set("X-USER-ID", USER_ID)
                .send({ quantity: 2 });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Cart item not found" });
        });

    });

    describe("DELETE /api/cart/:id", () => {

        it("removes a cart item", async () => {
            const response = await request(app)
                .delete("/api/cart/1")
                .set("X-USER-ID", USER_ID);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true });
            expect(cartRepository.delete).toHaveBeenCalledWith(USER_ID, 1);
        });

    });

});
