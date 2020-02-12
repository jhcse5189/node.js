/**
 * modulize for DB UserSchema
 * 
 * @date 2020-02-07
 * @author bammer
 */

// import bcrypt module
const bcrypt = require('bcrypt'),
      saltRounds = 10;

let Schema = {};

Schema.createSchema = function(mongoose) {

    // Schema definition
    UserSchema = mongoose.Schema({
        id: {type: String, require: true, unique: true, default: ''},
        name: {type: String, index: 'hashed', default: ''},
        hashed_password: {type: String, require: true, default: ''},
        salt: {type: String, required: true},
        age: {type: Number, default: -1},
        created_at: {type: Date, index: {unique: false}, default: Date.now},
        updated_at: {type: Date, index: {unique: false}, default: Date.now},
    });

    UserSchema
        .virtual('password')
        .set(function(password) {
            console.log(`called set in virtual password method`);
            this._password = password;
            this.salt = this.makeSalt(saltRounds);
            this.hashed_password = this.encrytPassword(password, this.salt);
        })
        .get(function() {
            console.log(`called get in virtual password method`);
            return this._password;
        });

    // makeSalt method
    UserSchema.method('makeSalt', function(saltRounds) {

        var _salt = bcrypt.genSaltSync(saltRounds);
        console.log(`\t_salt: ${_salt}`);
        return _salt;
    });

    // encrytPassword method
    UserSchema.method('encrytPassword', function(plainText, salt) {

        var _hash = bcrypt.hashSync(plainText, salt);
        console.log(`\t_hash: ${_hash}`);
        return _hash;
    });

    // authenticate method
    UserSchema.method('authenticate', function(plainText, ciphertext) {

        var _tf = bcrypt.compareSync(plainText, ciphertext);
        console.log(`\t_tf: ${_tf}`);
        return _tf;
    });

    // check is value is validated
    var validatePresenceOf = function(value) {
        return value && value.length;
    };


    // define mongoose middleware that trigger on save event
    UserSchema.pre('save', function() {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.password)) {
            next(new Error(`invalid 'password' field.`));
        } else {
            next();
        }
    });


    // check is validated for required attr.
    UserSchema.path('id').validate(function (id) {
        return id.length;
    }, `'id' column's value is empty.`);

    UserSchema.path('name').validate(function (name) {
        return name.length;
    }, `'name' column's value is empty.`);

    UserSchema.path('hashed_password').validate(function (hashed_password) {
        return hashed_password.length;
    }, `'hashed_password' column's value is empty.`);


    // add findById, findAll method to schema as static
    UserSchema.static('findById', function(id, callback) {
        return this.find({id: id}, callback);
    });
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback);
    });

    return UserSchema;
}

// assign UserSchema object to module.exports directly
module.exports = Schema;
