const sanitize = (obj) => {
    if (obj instanceof Object) {
        for (var key in obj) {
        if (/^\$/.test(key)) {
            delete obj[key];
        } else {
            sanitize(obj[key]);
        }
        }
    }
    return obj;
};

module.exports = sanitize;