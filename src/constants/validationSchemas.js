import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    birthDate:
        Yup.string()
           .required('لطفا تاریخ تولد خود را وارد نمایید.'),
    gender:
        Yup.string()
           .matches(/(male|femail)/, 'لطفا جنسیت خود را وارد نمایید.')
           .required('لطفا جنسیت خود را وارد نمایید.'),
    state:
        Yup.string()
           .required('لطفا استان خود را وارد نمایید.'),
    address:
        Yup.string()
           .required('لطفا آدرس خود را وارد نمایید.'),
    city:
        Yup.string()
           .required('لطفا شهر خود را وارد نمایید.'),
    postalCode:
        Yup.string()
           .min(10, 'کد پستی کوتاه است.')
           .max(10, 'کد پستی بلند است.')
           .required('لطفا کد پستی خود را وارد نمایید.'),
    nationalCode:
        Yup.string()
           .min(10, 'کد ملی کوتاه است.')
           .max(10, 'کد ملی بلند است.')
           .required('لطفا کد ملی خود را وارد نمایید.'),
    mobile:
        Yup.string()
           .min(11, 'شماره همراه کوتاه است.')
           .max(11, 'شماره همراه بلند است.')
           .required('لطفا شماره همراه خود را وارد نمایید.'),
    email:
        Yup.string()
           .email('ایمیل اشتباه است.')
           .required('لطفا آدرس ایمیل را وارد نمایید.'),
    fullName:
        Yup.string()
           .min(5, 'نام و نام خانوادگی کوتاه است.')
           .max(50, 'نام و نام خانوادگی بلند است.')
           .required('لطفا نام و نام خانوادگی خود را وارد نمایید.'),
});
export const SignInSchema = Yup.object().shape({
    mobile:
        Yup.string()
           .min(11, 'شماره همراه کوتاه است.')
           .max(11, 'شماره همراه بلند است.')
           .required('لطفا شماره همراه خود را وارد نمایید.'),
    password:
        Yup.string()
           .min(8, 'کلمه عبور کوتاه است.')
           .max(50, 'کلمه عبور بلند است.')
           .required('کلمه عبور را وارد نمایید.'),
});
