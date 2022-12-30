export class VarParsers {
  parseStringToBoolean(someString: string | null): boolean {
    if (someString === null) {
      return null;
    } else if (someString === 'false') {
      return false;
    } else if (someString === 'true') {
      return true;
    }

    return null;
  }
}
