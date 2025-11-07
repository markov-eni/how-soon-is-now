type Constructor<T = any> = new (...args: any[]) => T;

class Container {
  private services = new Map<Constructor, Constructor>();
  private instances = new Map<Constructor, any>();

  register<T>(token: Constructor<T>, implementation: Constructor<T>) {
    this.services.set(token, implementation);
  }

  resolve<T>(token: Constructor<T>): T {
    const target = this.services.get(token) || token;
    if (this.instances.has(target)) {
      return this.instances.get(target);
    }

    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    const deps = paramTypes.map((param: Constructor) => this.resolve(param));
    const instance = new target(...deps);

    this.instances.set(target, instance);
    return instance;
  }
}

export const container = new Container();
