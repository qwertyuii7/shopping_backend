const { Product_model } = require("../models/productsSchema");


const get_products = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 20;
        const category = req.query.category;
        const cursor = req.query.cursor;

        const query = {};

        if (category) {
            query.category = category.toLowerCase();
        }

        if (cursor) {
            const decoded = decodeCursor(cursor);
            query.$or = [
                { created_at: { $lt: new Date(decoded.created_at) } },
                {
                    created_at: new Date(decoded.created_at),
                    _id: { $lt: decoded.id }
                }
            ]
        }


        const products = await Product_model.find(query).sort({ created_at: -1, _id: -1 }).limit(limit + 1);

        const hasmore = products.length > limit;
        const pageItems = hasmore ? products.slice(0, limit) : products;

        let nextCursor = null;
        if (hasmore) {
            const lastitem = pageItems[pageItems.length - 1];
            nextCursor = encodeCursor(lastitem.created_at, lastitem._id);
        }


        res.json({
            data: pageItems,
            next_cursor: nextCursor
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error : "something went wrong for this product"
        });

    }

}


function encodeCursor(created_at, id) {
  const payload = JSON.stringify({ created_at, id });
  return Buffer.from(payload).toString('base64');
}

function decodeCursor(cursor) {
  const payload = Buffer.from(cursor, 'base64').toString('utf-8');
  return JSON.parse(payload);
}

module.exports = get_products;