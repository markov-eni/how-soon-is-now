// container.ts
type Constructor<T = any> = new (...args: any[]) => T;

class Container {
  private services = new Map<Constructor, Constructor>();

  register<T>(token: Constructor<T>, implementation: Constructor<T>) {
    this.services.set(token, implementation);
  }

  resolve<T>(token: Constructor<T>): T {
    const target = this.services.get(token) || token;
    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    const deps = paramTypes.map((param: Constructor) => this.resolve(param));
    return new target(...deps);
  }
}

export const container = new Container();
