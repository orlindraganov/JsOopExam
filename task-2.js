/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this._productType = productType;
            this._name = name;
            this._price = price;
        }

        get productType() {
            return this._productType;
        }

        set productType(productType) {
            this._productType = productType;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            this._name = name;
        }

        get price() {
            return this._price;
        }

        set price(price) {
            this._price = price;
        }
    }

    class ShoppingCart {
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        set products(products) {
            this._products = products;
        }

        add(product) {
            //CHAINING
            this._products.push(product);
            return this;
        }

        remove(product) {
            var productIndex = this._products.indexOf(product);
            if (productIndex === -1) {
                throw new ProductNotFoundException("Product not found");
            }

            if (this._products.length === 0) {
                throw new ShoppingCartEmptyException("Shopping cart is empty");
            }

            this._products.splice(productIndex, 1);
        }

        showCost() {
            if (this.products.length === 0) {
                return 0;
            }
            var cost = 0;

            this.products.forEach(function (product) {
                cost += product.price;
            });

            return cost;
        }

        showProductTypes() {
            var productTypes = [],
                prType,
                productTypeIndex;

            this.products.forEach(function (product) {
                prType = product.productType;
                productTypeIndex = productTypes.indexOf(prType);

                if (productTypeIndex === -1) {
                    productTypes.push(prType);
                }
            });

            productTypes.sort();

            return productTypes;
        }

        getInfo() {
            function dynamicSort(property) {
                var sortOrder = 1;
                if (property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a, b) {
                    var result = (a[property] < b[property]) ? -1 : ((a[property] > b[property]) ? 1 : 0);
                    return result * sortOrder;
                }
            }
            if (this.products.length === 0) {
                return { products: [], totalPrice: 0 };
            }

            var prods = this.products.slice();
            var info = {
                products: [],
                totalPrice: 0
            };

            prods.sort(dynamicSort("name"));

            info.products.push(
                {
                    name: prods[0].name,
                    totalPrice: prods[0].price,
                    quantity: 1
                });

            info.totalPrice = prods[0].price;

            for (var i = 1; i < prods.length; i += 1) {
                if (prods[i - 1].name != prods[i].name) {
                    info.products.push(
                        {
                            name: prods[i].name,
                            totalPrice: prods[i].price,
                            quantity: 1
                        });
                    info.totalPrice += prods[i].price;
                } else {
                    let len = info.products.length;
                    info.totalPrice += prods[i].price;
                    info.products[len - 1].totalPrice += prods[i].price;
                    info.products[len - 1].quantity += 1;
                }
            }
            return info;
        }
    }

    return {
        Product, ShoppingCart
    };
}

module.exports = solve;