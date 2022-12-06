exports.getPagination = (currentPage, pageSize) => {
    const offset = (currentPage - 1) * pageSize;
    return { offset: parseInt(offset), limit: parseInt(pageSize) };
};

exports.getPagingData = (sequelizeResult, page, limit) => ({
    page: page,
    limit: limit,
    total: sequelizeResult.count,
    data: sequelizeResult.rows,
});
