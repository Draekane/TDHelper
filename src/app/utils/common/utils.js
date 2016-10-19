﻿import React from 'react';

export const onlyAlpha = new RegExp('[A-Z]');

export function isNumeric(n) {
    return n !== null && !isNaN(+n) && isFinite(n);
}

export function getNumber(n) {
    const isNumericCheck = isNumeric(n);
    if (isNumericCheck) {
        return parseInt(n, 10);
    } else {
        return n && n.toLowerCase() === 'null' ? null : n;
    }
}

export function returnBoolean(b) {
    switch (`${b}`) {
        case 'true':
        case 't':
        case '1':
        case 'True':
        case 'T':
        case 'TRUE':
            return true;
        case 'false':
        case 'f':
        case '0':
        case 'False':
        case 'F':
        case 'FALSE':
            return false;
        default:
            return b;
    }
}
