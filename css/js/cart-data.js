(function (window) {
    "use strict";

    const STORAGE_KEY = "ladyrose_cart";
    const EVENT_NAME = "cart:updated";

    function readRaw() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.error("CartData: lỗi đọc giỏ hàng", err);
            return [];
        }
    }

    function writeRaw(items) {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (err) {
            console.error("CartData: lỗi lưu giỏ hàng", err);
        }
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items: items } }));
    }

    const CartData = {

        getCart: function () {
            return readRaw();
        },

        addItem: function (product) {
            if (!product || !product.id) {
                console.error("CartData.addItem: thiếu 'id' của sản phẩm", product);
                return;
            }

            const items = readRaw();
            const qtyToAdd = parseInt(product.qty, 10) || 1;
            const existing = items.find(function (it) { return it.id === product.id; });

            if (existing) {
                existing.qty += qtyToAdd;
            } else {
                items.push({
                    id: product.id,
                    name: product.name || "Sản phẩm",
                    price: Number(product.price) || 0,
                    image: product.image || "",
                    color: product.color || "",
                    colorHex: product.colorHex || "",
                    size: product.size || "",
                    qty: qtyToAdd
                });
            }

            writeRaw(items);
        },

        updateQty: function (id, qty) {
            let items = readRaw();
            const newQty = parseInt(qty, 10) || 0;

            if (newQty < 1) {
                items = items.filter(function (it) { return it.id !== id; });
            } else {
                const target = items.find(function (it) { return it.id === id; });
                if (target) target.qty = newQty;
            }

            writeRaw(items);
        },

        removeItem: function (id) {
            const items = readRaw().filter(function (it) { return it.id !== id; });
            writeRaw(items);
        },

        clearCart: function () {
            writeRaw([]);
        },

        getTotalQuantity: function () {
            return readRaw().reduce(function (sum, it) { return sum + it.qty; }, 0);
        },

        getSubtotal: function () {
            return readRaw().reduce(function (sum, it) { return sum + it.qty * it.price; }, 0);
        },

        EVENT_NAME: EVENT_NAME
    };

    window.CartData = CartData;

})(window);