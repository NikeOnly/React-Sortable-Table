import generateUuid from 'uuid/v1';

export class Field {
    constructor(id, firstName, lastName, phone, gender, age) {
        this.code = generateUuid();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.gender = gender;
        this.age = age;
    }
}
