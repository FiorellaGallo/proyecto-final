import { cartModel } from '../model/cart.model.js';

class CartMongooseDao {

    async createCart(cart) {
        console.log(cart);
        const document = await cartModel.create({ products: cart });
        console.log(document);
        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),
        };
    }

    async findCartById(id) {
        const document = await cartModel.findOne({ _id: id }).populate("products._id");

        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };
    }

    async updateCart(id, data) {
        let document = await cartModel.findOneAndUpdate(
            { _id: idCart, 'products._id': idProduct },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
        );

        if (!document) {
            document = await cartModel.findOneAndUpdate(
                { _id: idCart },
                { $push: { products: { _id: idProduct, quantity: 1 } } },
                { new: true }
            );
        }

        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };
    }

    async deleteProduct(cid, pid) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { _id: pid } } },
            { new: true }
        );
        
        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };
    };

    async deleteAllProducts(cid) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: [] } },
            { new: true }
        );
        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };
    };

    async changeProducts(cid, data) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: data } },
            { new: true },
        );

        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };
    };

    async newQuantity(cid, pid, quantity) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid, 'products._id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true },
        );

        if (!document) return null;

        return {
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        };


    };

};

export default CartMongooseDao;