export default class UserDTO {
    email;
    id;
    isActivated;
    isInformed;
    login;
    name;
    lastname;
    city;
    country;
    birthday;
    bio;
    avatarUrl;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.isInformed = model.isInformed;
        this.login = model.login;
        this.name = model.name;
        this.lastname = model.lastname;
        this.city = model.city;
        this.country = model.country;
        this.birthday = model.birthday;
        this.bio = model.bio;
        this.avatarUrl = model.avatarUrl;
    }
}