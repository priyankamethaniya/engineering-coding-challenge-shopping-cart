jest.mock("../../repositories/product.repository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    search: jest.fn()
}));

const repository = require("../../repositories/product.repository");
const productService = require("../../services/product.service");

describe("ProductService", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getProducts", () => {

        it("returns the full product list from the repository", async () => {
            const products = [
                { id: 1, name: "Keyboard", price: 50, stock: 10 },
                { id: 2, name: "Mouse", price: 20, stock: 30 }
            ];
            repository.findAll.mockResolvedValue(products);

            const result = await productService.getProducts();

            expect(result).toBe(products);
            expect(repository.findAll).toHaveBeenCalledTimes(1);
        });

    });

    describe("searchProducts", () => {

        it("returns all products when the query is empty", async () => {
            const products = [{ id: 1, name: "Keyboard", price: 50, stock: 10 }];
            repository.findAll.mockResolvedValue(products);

            const result = await productService.searchProducts("");

            expect(result).toBe(products);
            expect(repository.search).not.toHaveBeenCalled();
        });

        it("returns all products when the query is only whitespace", async () => {
            const products = [{ id: 1, name: "Keyboard", price: 50, stock: 10 }];
            repository.findAll.mockResolvedValue(products);

            const result = await productService.searchProducts("   ");

            expect(result).toBe(products);
            expect(repository.search).not.toHaveBeenCalled();
        });

        it("delegates to repository.search with the trimmed, case-insensitive query", async () => {
            const matches = [
                { id: 1, name: "Keyboard", price: 50, stock: 10 },
                { id: 5, name: "Gaming Keyboard", price: 100, stock: 4 }
            ];
            repository.search.mockResolvedValue(matches);

            const result = await productService.searchProducts("  key  ");

            expect(result).toBe(matches);
            expect(repository.search).toHaveBeenCalledWith("key");
            expect(repository.findAll).not.toHaveBeenCalled();
        });

    });

});
