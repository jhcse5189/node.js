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

* * *
