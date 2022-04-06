class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            } : {}
        console.log(keyword);

        this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const querryCopy = { ...this.queryStr }

        //Remove some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete querryCopy[key]);

        //filter via price 


        let queryStr = JSON.stringify(querryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);




        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage) {
        const currentpage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentpage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};

module.exports = ApiFeatures;