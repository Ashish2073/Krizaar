const { check,validationResult} = require('express-validator');

const validateUserData = [
    /////////Users/////////////////
    check('user.first_name').notEmpty().withMessage('First name is required'),
    check('user.last_name').notEmpty().withMessage('Last name is required'),
    check('user.email').isEmail().withMessage('Invalid email address'),
    check('user.password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('user.phone_number').isMobilePhone().withMessage('Invalid phone number'),

    ///Addresss//////////////////////////


    // Add validation rules for other fields as needed
    check('address.deliverd_person_full_name').notEmpty().withMessage('First name is required'),
    check('address.deliverd_person_phone_number').isMobilePhone().withMessage('Invalid phone number'),
    check('address.pin_code').notEmpty().withMessage('Pincode name is required'),
    check('address.country').notEmpty().withMessage('Countery name is required'),
    check('address.state').notEmpty().withMessage('State name is required'),
    check('address.city').notEmpty().withMessage('City name is required'),
    check('address.address_type').notEmpty().withMessage('Please select home or city option'),
    



];

module.exports = { validateUserData };