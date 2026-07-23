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

const cartRepository = require("../../repositories/cart.repository");
const productRepository = require("../../repositories/product.repository");
const cartService = require("../../services/cart.service");

const USER_ID = "test-user";

describe("CartService", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("add", () => {

        it("throws a 404 when the product does not exist", async () => {
            productRepository.findById.mockResolvedValue(undefined);

            await expect(
                cartService.add(USER_ID, 9999)
            ).rejects.toMatchObject({
                message: "Product not found",
                statusCode: 404
            });

            expect(cartRepository.save).not.toHaveBeenCalled();
        });

        it("adds a new cart item when the product isn't already in the cart", async () => {
            productRepository.findById.mockResolvedValue(
                { id: 1, name: "Keyboard", price: 50, stock: 10 }
            );
            cartRepository.findByProductId.mockResolvedValue(undefined);

            const result = await cartService.add(USER_ID, 1);

            expect(cartRepository.save).toHaveBeenCalledWith(
                USER_ID,
                expect.objectContaining({
                    productId: 1,
                    name: "Keyboard",
                    price: 50,
                    quantity: 1
                })
            );
            expect(result.quantity).toBe(1);
        });

        it("increments quantity when the product is already in the cart", async () => {
            productRepository.findById.mockResolvedValue(
                { id: 1, name: "Keyboard", price: 50, stock: 10 }
            );
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 1, name: "Keyboard", price: 50, quantity: 2 }
            );

            const result = await cartService.add(USER_ID, 1);

            expect(cartRepository.updateQuantity).toHaveBeenCalledWith(USER_ID, 1, 3);
            expect(result.quantity).toBe(3);
        });

        it("throws a 400 when the next quantity would exceed stock", async () => {
            productRepository.findById.mockResolvedValue(
                { id: 4, name: "Laptop", price: 1200, stock: 3 }
            );
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 4, name: "Laptop", price: 1200, quantity: 3 }
            );

            await expect(
                cartService.add(USER_ID, 4)
            ).rejects.toMatchObject({
                message: "Not enough stock",
                statusCode: 400
            });

            expect(cartRepository.updateQuantity).not.toHaveBeenCalled();
        });

    });

    describe("remove", () => {

        it("deletes the cart item for the given user and product", async () => {
            await cartService.remove(USER_ID, 1);

            expect(cartRepository.delete).toHaveBeenCalledWith(USER_ID, 1);
        });

    });

    describe("update", () => {

        it("throws a 400 for a negative quantity", async () => {
            await expect(
                cartService.update(USER_ID, 1, -5)
            ).rejects.toMatchObject({
                message: "Invalid quantity",
                statusCode: 400
            });

            expect(cartRepository.findByProductId).not.toHaveBeenCalled();
        });

        it("throws a 400 for a non-numeric quantity", async () => {
            await expect(
                cartService.update(USER_ID, 1, "abc")
            ).rejects.toMatchObject({
                message: "Invalid quantity",
                statusCode: 400
            });
        });

        it("throws a 404 when the cart item does not exist", async () => {
            cartRepository.findByProductId.mockResolvedValue(undefined);

            await expect(
                cartService.update(USER_ID, 1, 2)
            ).rejects.toMatchObject({
                message: "Cart item not found",
                statusCode: 404
            });
        });

        it("removes the item when quantity is set to 0", async () => {
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 1, name: "Keyboard", price: 50, quantity: 2 }
            );

            await cartService.update(USER_ID, 1, 0);

            expect(cartRepository.delete).toHaveBeenCalledWith(USER_ID, 1);
            expect(cartRepository.updateQuantity).not.toHaveBeenCalled();
        });

        it("throws a 400 when the requested quantity exceeds stock", async () => {
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 4, name: "Laptop", price: 1200, quantity: 1 }
            );
            productRepository.findById.mockResolvedValue(
                { id: 4, name: "Laptop", price: 1200, stock: 3 }
            );

            await expect(
                cartService.update(USER_ID, 4, 10)
            ).rejects.toMatchObject({
                message: "Not enough stock",
                statusCode: 400
            });

            expect(cartRepository.updateQuantity).not.toHaveBeenCalled();
        });

        it("updates the quantity when the request is valid", async () => {
            cartRepository.findByProductId.mockResolvedValue(
                { productId: 1, name: "Keyboard", price: 50, quantity: 1 }
            );
            productRepository.findById.mockResolvedValue(
                { id: 1, name: "Keyboard", price: 50, stock: 10 }
            );

            await cartService.update(USER_ID, 1, 5);

            expect(cartRepository.updateQuantity).toHaveBeenCalledWith(USER_ID, 1, 5);
        });

    });

});
