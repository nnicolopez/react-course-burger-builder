export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid &= value.trim() !== '';
    }
    if (rules.minLength) {
        isValid &= value.length >= rules.minLength;
    }
    if (rules.maxLength) {
        isValid &= value.length <= rules.maxLength;
    }
    if (rules.isEmail) {
        const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        isValid &= pattern.test(value);
    }
    return isValid;
};