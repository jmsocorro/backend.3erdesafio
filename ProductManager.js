const fs = require("fs");
class ProductManager {
    #products;
    #path; // ruta del archivo
    constructor(path = "productos.txt") {
        this.#path = path;
        this.#products = [];
        // Si el archivo existe copio los datos del archivo a #products.
        if (fs.existsSync(path)) {
            this.#products = JSON.parse(fs.readFileSync(path, "utf-8"));
        } else {
            console.log("No existe el archivo!");
        }
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id =
            this.#products.length === 0
                ? 1
                : this.#products[this.#products.length - 1].id + 1;
        let error = "";
        error += !title || title.length === 0 ? "title es obligatorio. " : "";
        error +=
            !description || description.length === 0
                ? "description es obligatorio. "
                : "";
        error += !price || price.length === 0 ? "price es obligatorio. " : "";
        error +=
            !thumbnail || thumbnail.length === 0
                ? "thumbnail es obligatorio. "
                : "";
        error += !code || code.length === 0 ? "code es obligatorio. " : "";
        error += !stock || stock.length === 0 ? "stock es obligatorio. " : "";

        const found = this.#products.find((producto) => producto.code === code);
        if (found) {
            error += "Ya se encuentra un producto con el mismo code. ";
        }

        if (error.length > 0) {
            console.log("Ocurrieron los siguientes errores: " + error);
        } else {
            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.#products.push(product);
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        }
    };

    getProducts = () => {
        return this.#products;
    };

    getProductById = (id) => {
        const found = this.#products.find((producto) => producto.id === id);
        if (!found) {
            console.log("Not found");
        } else {
            return found;
        }
    };

    // Metodo para obtener la ruta al archivo
    getPath = () => {
        return this.#path;
    };

    updateProduct = (id, title, description, price, thumbnail, code, stock) => {
        // busco el indice del producto
        const found = this.#products.findIndex(
            (producto) => producto.id ===  parseInt(id),
        );
        // Si no existo aviso por consola, sino valido los campos y guardo
        if (found < 0) {
            console.log("Not found");
        } else {
            let error = "";
            error +=
                !title || title.length === 0 ? "title es obligatorio. " : "";
            error +=
                !description || description.length === 0
                    ? "description es obligatorio. "
                    : "";
            error +=
                !price || price.length === 0 ? "price es obligatorio. " : "";
            error +=
                !thumbnail || thumbnail.length === 0
                    ? "thumbnail es obligatorio. "
                    : "";
            error += !code || code.length === 0 ? "code es obligatorio. " : "";
            error +=
                !stock || stock.length === 0 ? "stock es obligatorio. " : "";

            const codefound = this.#products.find(
                (producto) => producto.code === code,
            );
            // verifico si el codigo nuevo no se repite en otro producto
            if (codefound && parseInt(id) !== codefound.id) {
                error += "Ya se encuentra un producto con el mismo code. ";
            }

            if (error.length > 0) {
                console.log("Ocurrieron los siguientes errores: " + error);
            } else {
                this.#products[found] = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                };
                fs.writeFileSync(this.#path, JSON.stringify(this.#products));
            }
        }
    };

    deleteProduct = (id) => {
        // busco el indice del producto
        const found = this.#products.findIndex(
            (producto) => producto.id === parseInt(id),
        );
        // Si no existe aviso por consola, sino quito el producto del array y guardo
        if (found < 0) {
            console.log("Not found");
        } else {
            console.log(found);
            this.#products.splice(found, 1);
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        }
    };
}



/* TESTEO
const prod = new ProductManager("productos.txt");
prod.addProduct("title", "description", "price", "thumbnail", "code", "stock");
prod.addProduct("title", "description", "price", "thumbnail", "code2", "stock");
prod.addProduct("title", "description", "price", "thumbnail", "code3", "stock");
console.log(prod.getProducts());
prod.updateProduct(2,"Nuevo title", "description", "price", "thumbnail", "code4", "25");
console.log(prod.getProducts());
prod.deleteProduct(1);
prod.addProduct("title", "", "price", "thumbnail", "code", "stock");
console.log(prod.getProducts());
console.log(prod.getProductById(2));
*/
