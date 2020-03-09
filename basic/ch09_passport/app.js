/**
 * app.js | adjust local auth. using passport mudule
 * 
 * http://localhost:3000/public/login.html
 * http://localhost:3000/public/adduser.html
 * 
 * @data 2020-03-09
 * @author Bammer
 */

// import express modules
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middlewares
const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      static = require('serve-static'),
      expressErrorHandler = require('express-error-handler');

// import passport modules
const passport = require('passport'),
      flash = require('connect-flash');



// (1). import config.js
var config = require('./config');

// (2). import database.js
var database = require('./database/db');

// (3). import route_loader.js
var route_loader = require('./routes/route_loader');



// create express object
var app = express();

// set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
console.log(`set 'view engine' as 'pug'`);

// set the port as attr. of app obj.
console.log(`config.server_port: ${config.server_port}`);
app.set('port', process.env.PORT || 3000);



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// set cookie-parser -> can access req.cookies
app.use(cookieParser());

// set session
app.use(session({
    secret: 'bammer-key',
    resave: true,
    saveUninitialized: true,
}));

// open public dirs
app.use('/public', static(path.join(__dirname, 'public')));



// (4). load routing info. and set
route_loader.init(app, express.Router());



// passport usage setting
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// passport strategy setting
let LocalStrategy = require('passport-local').Strategy;

// login setting
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // send req. obj. to callback function
    }, function(req, email, password, done) {
        console.log(`called local-login from paaport: ${email}, ${password}`);

        let database = app.get('database');
        database.UserModel.findOne({'email': email}, function(err, user) {
            if (err) { return done(err); }

            // 등록된 사용자가 없는 경우
            if (!user) {
                console.log('계정이 일치하지 않음.');
                // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
                return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.'));
            }

            // 비밀번호를 비교하여 맞지 않는 경우
            let authenticated = user.authenticate(password, user._doc.hashed_password);
            if (!authenticated) {
                console.log(`\tNOT FOUND: not found user`);
                // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
                return done(null, false, req.flash('loginMessage', '비밀번호가 일치하지 않습니다.'));
            }

            // 정상인 경우
            console.log('계정과 비밀번호가 일치함.');
            // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
            return done(null, user);
        });
    }
));

// register setting
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done) {
        var paramName = req.body.name || req.query.name;
        console.log(`called local-signup from paaport: ${email}, ${password}, ${paramName}`);

        // +. User.findOne의 blocking을 방지하기위해 async 방식으로 변경 가능
        process.nextTick(function() {
            var database = app.get('database');
            database.UserModel.findOne({'email': email}, function(err, user) {

                if (err) { return done(err); }

                // 기존에 사용자 정보가 있는 경우
                if (user) {
                    console.log('기존에 계정이 있음.');
                    return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));
                } else {
                    var user = new database.UserModel({'email': email, 'password': password, 'name': paramName});
                    user.save(function(err) {
                        if (err) { throw err; }
        
                        console.log('사용자 데이터 추가됨.');
                        return done(null, user);
                    });
                }
            });
        });
    }
));

// 세션 저장 => 사용자 인증 성공 시 호출
passport.serializeUser(function(user, done) {
    console.log(`called serializeUser()`);
    console.dir(user);

    done(null, user); // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
    // 로그인 이후에 들어오는 요청은 deserializeUser 메소드 안에서 이 세션을 확인할 수 있음
});

// 세션 복원 => 사용자 인증 이후 사용자 요청 시마다 호출
passport.deserializeUser(function(user, done) {
    console.log(`called deserializeUser()`);
    console.dir(user);

    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    // 두 번째 파라미터로 지정한 사용자 정보는 req.user 객체로 복원됨
    // 여기에서는 파라미터로 받은 user를 별도로 처리하지 않고 그대로 넘겨줌
    done(null, user); 
});



/* catch 404*/

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html',
    }
});

// after all routes, pass a 404 into next(err)
app.use( expressErrorHandler.httpError(404) );
// handle all unhandled errors
app.use( errorHandler );



/* Run express server */

process.on('SIGINT', () => {
    console.log('PROCESS KILLED:)');
    process.exit(0);
});

/*
app.on('close', () => {
    console.log(`CLOSE EXPRESS SERVER:)`);
    if (database.db) {
        database.db.close();
    }
});
*/

http.createServer(app).listen(app.get('port'), function() {
    console.log(`EXPRESS: server is running on ${app.get('port')}`);

    // init DB
    database.init(app, config);
});
