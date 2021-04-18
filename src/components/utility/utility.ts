export type Theme = "light-theme" | "dark-theme"

export function listToText(list: string[]): string {
    let text = list[0];

    for (let i = 1; i < list.length; i++) {
        text += ", " + list[i]
    }

    return text;
}

export function numberWithComma(num: number): string {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getGridParams(pathname: string): { [k: string]: any } {
    const queryString = require('query-string');

    let parsed = queryString.parse(pathname.split("?", 2).pop());

    let params: { [k: string]: any } = {};

    if (Object.prototype.hasOwnProperty.call(parsed, 'region')) {
        params.region = parsed.region;
    }

    if (Object.prototype.hasOwnProperty.call(parsed, 'search')) {
        params.search = parsed.search;
    }

    return params;
}

export function isInvalidParams(pathname: string) {
    const queryString = require('query-string');

    let parsed = queryString.parse(pathname.split("?", 2).pop());
    const parseCount = Object.keys(parsed).length;

    if (parseCount === 0) {
        return true
    }

    if (parseCount > 2) {
        return true
    }

    if (parseCount === 1) {
        if (Object.prototype.hasOwnProperty.call(parsed, 'region') ||
        Object.prototype.hasOwnProperty.call(parsed, 'search')) {
            return false
        } else {
            return true
        }
    }

    if (parseCount === 2) {
        if (Object.prototype.hasOwnProperty.call(parsed, 'region') &&
        Object.prototype.hasOwnProperty.call(parsed, 'search')) {
            return false
        } else {
            return true
        }
    }

    return false;
}