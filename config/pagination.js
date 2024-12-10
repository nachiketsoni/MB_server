export const formatPagination = async(limit, currentPage = 1) => {
	let skip = currentPage < 2 ? 0 : (currentPage - 1) * limit;
  return {
 	  skip:skip,
    limit:limit,
    currentPage:currentPage
  }
}

export const formatPaginationResponse = async (limit, totalData, data, currentPage = 100) => {
    return {
        limit:limit,
        data:data,
        totalData:totalData,
        totalPage:Math.ceil(totalData/limit),
        currentPage:currentPage
    }
}