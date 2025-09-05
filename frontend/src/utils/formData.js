const debugFormData = (formData) => {
        const obj = {};
        formData.forEach((value, key) => {
            if (!obj[key]) obj[key] = [];
            obj[key].push(
                value instanceof File 
                ? { name: value.name, size: value.size, type: value.type }
                : value
            );
        });
        console.log(obj);
};

export default debugFormData;   