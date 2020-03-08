/**
 * config file for app_seperated2.js
 * 
 * @date 2020-03-09
 * @author Bammer
 */

module.exports = {
    server_port: 3000,
    db_url: 'mongodb://127.0.0.1:27017/local',
    db_schemas: [
        {file: './user_schema', collection: 'users5', schemaName: 'UserSchema', modelName: 'UserModel'}
    ],
    route_info: [
        /*
        // ===== User ===== //
        {file: './user', path: '/process/login', method: 'login', type: 'post'},        // user.login
        {file: './user', path: '/process/adduser', method: 'adduser', type: 'post'},    // user.adduser
        {file: './user', path: '/process/listuser', method: 'listuser', type: 'post'},  // user.listuser

        // ===== Test ===== //
        {file: './test', path: '/process/test1', method: 'test1', type: 'post'}         // test.test1
        */
    ],
}
