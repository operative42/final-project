const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
};

export const fetchAPI = function(date) {
    let result = [];
    // Correction : s'assurer que date est un objet Date
    const dateObj = (date instanceof Date) ? date : new Date(date);
    let day = dateObj.getDay();
    let random = seededRandom(day);

    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) {
            result.push(i + ':00');
        }
        if (random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

// eslint-disable-next-line no-unused-vars
export const submitAPI = function(formData) {
    return true;
};
