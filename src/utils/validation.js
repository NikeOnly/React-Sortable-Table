export default function validation(message, field) {
    if(message.length === 0) {
        return 'Cannot be empty'
    }

    if(field === 'age' && message > 150) {
        return 'Too many years'
    }

    if ((field === 'firstName' || field === 'lastName') && message.match(/^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$/) === null) {
        return 'Letters and numbers are allowed. Letter should be first'
    }

    if(field === 'phone' && message.match(/^\d+$/) === null) {
        return 'Only digits are allowed'
    }

    return '';
}
