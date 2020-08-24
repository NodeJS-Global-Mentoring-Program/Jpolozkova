exports.executeQuery  = async (query, next) => {
    try {
        return await query;
    } catch (e) {
        console.log('Error: ', e.message);
        return next(e);
    }
};