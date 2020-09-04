exports.executeQuery  = async (query: Promise<any>, next: any) => {
    try {
        return await query;
    } catch (e) {
        console.log('Error: ', e.message);
        return next(e);
    }
};