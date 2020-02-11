# ch07. Modulize


* Roles

~~~

- require method
  -> ref. obj. from other module files

~~~

* Rules

~~~

- 1. CAN add js. obj to exports obj. as attr.
     method is also a kind of js. obj.
     -> can use via parentheses on assigned variable

- 2. CANNOT add  js. obj to exports obj. directly
     use module.exports

- 3. If use both exports and module.exports,
     global variable exports is ignored

- 4. Code can be seperated in assigning ...

     (1). function
     (2). instance object
     (3). prototype object

~~~


- [X] app_seperated1.js, ./routes/user.js, ./database/user_schema.js

~~~
commit 5be97df162e9321f2b3c43f5a488984ec078e43a (HEAD -> master)
Author: Bammer <jhcse5189@gmail.com>
Date:   Sat Feb 8 05:14:04 2020 +0900

    ch07. modulized app_seperated1.js
~~~

- [ ] app_seperated2.js, config.js, ./database/db.js, ./database/user_schema.js, ./routes/route_loader.js, ./routes/user.js




* * *
