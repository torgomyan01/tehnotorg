export const URL_SITE = {
    HOME: '/',
    LOGIN: '/login',
    ABOUT: '/about',
    REGISTER: '/register',
    CATALOG: '/catalog',
    CATALOG_TERMINALS: '/catalog-terminals',
    PRODUCT: '/product',
    BUY: '/buy',
    ADMIN: '/admin',
    CREATE_PRODUCT: '/admin/create-product',
    CREATE_USER: '/admin/create-user',
    VIEW_PRODUCTS: '/admin/view-products'
};

export const classes = {
    activeItem: 'active-item',
    next: 'next-item',
    prev: 'prev-item'
};

export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const API_URLS = {
    REGISTER: '/register',
    REGISTER_ADMIN: '/register-admin',
    LOGIN: '/login',
    GET_ALL_USERS: '/get-all-users',
    CHANGE_USER_INFO: '/admin/change-user-info',
    REMOVE_USER: '/admin/remove-user',
    CREATE_PRODUCT: '/admin/create-product',
    GET_PRODUCTS: '/get-products',
    GET_PRODUCTS_TERMINAL: '/get-products-terminal',
    REMOVE_PRODUCT: '/remove-product',
    REMOVE_IMAGE_PRODUCT: '/remove-image-product',
    REMOVE_ADDRESS: '/remove-address',
    RENAME_PRODUCT: '/rename-product',
    CHANGE_DESC_PRODUCT: '/change-description-product',
    CREATE_ADDRESS_PRODUCT: '/create-address-product',
    CHANGE_INFO_ADDRESS: '/change-address',
    UPLOAD_FILE_PRODUCT: '/upload-file-product',
    GET_PRODUCT: '/product',
    SEARCH: '/search'
};

export const userTypes = {
    user: 'user',
    terminal: 'terminal'
};

export const alertMessages = {
    userInfoSaved: 'Информация успешно сохранена',
    userRemoved: 'Пользователь удалён',
    errorNameProduct: 'Нода обязательно написать имя продукта',
    errorPriceProduct: 'Нода обязательно написать цена продукта',
    errorImagesProduct: 'Вы должны выбрать хотя бы 1 картинку',
    successProduct: 'Спасибо продукт успешно добавлена',
    nameProductChanges: 'Имя товара успешно изменено ',
    successCreatedUser: 'Пользователь успешно создана',
    pleaseWait: 'Пожалуйста подождите',
    descriptionSave: 'Описание успешно сохранена',
    addressDeleted: 'Адрес удалённо',
    errorLoginUser: 'Неверный логин или пароль',
    successProductDeleted: 'Товар успешно удалено '
};

export const defAlert: any = {
    open: false,
    message: '',
    status: 'success'
};

export const userStatuses = {
    terminal: 'terminal',
    user: 'user',
    superUser: 'superUser'
};
