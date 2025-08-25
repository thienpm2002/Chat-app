const {search} = require('../services/search.service.js');


const searchChat = async (req,res,next) => {
    try {
        const { q } = req.query; 
        if (!q) return res.json([]);
        const users = await search(q);
        res.json(users);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    searchChat
}