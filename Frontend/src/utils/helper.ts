import { classes, userStatuses, userTypes } from './consts';
import { withCookies, Cookies } from 'react-cookie';
import { retry } from '@reduxjs/toolkit/query';

export const keyRandom = (length: number) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const years = (back: number) => {
    const year = new Date().getFullYear();
    return Array.from(
        { length: back },
        (v, i) => year - back + i + 1
    ).reverse();
};

export let index = 0;
export const NextSlide = (status: string) => {
    status === classes.next ? index++ : index--;
    const items = document.querySelectorAll('.slider-item');

    if (index === items.length) {
        index = 0;
    }
    if (index === -1) {
        index = 0;
    }
    items.forEach((item, index) => {
        item.classList.remove(`${classes.next}-1`);
        item.classList.remove(`${classes.next}-2`);
        item.classList.remove(`${classes.prev}-1`);
        item.classList.remove(`${classes.prev}-2`);
        item.classList.remove(classes.activeItem);
    });
    items[index - 2]?.classList.add(`${classes.prev}-2`);
    items[index - 1]?.classList.add(`${classes.prev}-1`);

    items[index].classList.add(classes.activeItem);

    items[index + 1]?.classList.add(`${classes.next}-1`);
    items[index + 2]?.classList.add(`${classes.next}-2`);
};

export const startSliderWorking = () => {
    const items = document.querySelectorAll('.slider-item');
    if (items.length > 2) {
        items.forEach((item, index) => {
            if (item.classList.contains(classes.activeItem)) {
                const item1 = items[index + 1]?.classList;
                const item2 = items[index + 2]?.classList;
                item1.add(`${classes.next}-1`);
                item2.add(`${classes.next}-2`);
            }
        });
    } else {
        items.forEach((item, index) => {
            if (item.classList.contains(classes.activeItem)) {
                const item1 = items[index + 1]?.classList;
                item1 && item1.add(`${classes.next}-1`);
            }
        });
    }
};

export const changeIndex = (num: number) => (index = num);

// FOR SERVER
export const WriteApi = (path: string) =>
    `http://tehnotorg-api.torgomyan.site/api${path}`;

// FOR LOCAL
// export const WriteApi = (path: string) => `http://tehnotorg.loc/api${path}`;

// FOR ENCODE AND DECODE OBJECT

export const numberPad = (number: number, width: number) =>
    new Array(width + 1 - `${number}`.length).join('0') + number;

export const getImgPath = (url: string) =>
    `${process.env.REACT_APP_IMAGES_PATH}/${url}`;

export const audio = new Audio();

export const printUserAddress = (userInfo: IUserInfo | null) => {
    if (userInfo) {
        return `${userInfo.country}${
            userInfo.status === userStatuses.terminal ? ',' : ''
        } ${
            userInfo.status === userStatuses.terminal
                ? userInfo.email_or_address
                : ''
        }`;
    } else {
        return '';
    }
};
