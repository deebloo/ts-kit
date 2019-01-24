# Di

Dependency Injection in ~800 bytes

#### Example:

```TS
import { Injector, Injectable } from '@ts-toolkit/di';

// Write a plain ol JS class
class FooService {
  sayHello() {
    return 'Hello From FooService';
  }
}

// Declare that class as a static dependency of another class
@Injectable({
  deps: [FooService]
})
class BarService {
  // and instance of that class will be passed to this one;
  constructor(private foo: FooService) {}

  sayHello() {
    return 'Hello From BarService and ' + this.foo.sayHello();
  }
}

// create a new instance of our injector
const app = new Injector();

// Use that injector to create new instances of objects
app.get(BarService).sayHello(); // Hello from BarService and Hello from FooService
```
