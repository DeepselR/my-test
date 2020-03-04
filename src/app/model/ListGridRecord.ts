export class ListGridRecord {
  setAttribute(attribute: string, value: string): void {
    this[attribute] = value;
  }

  getAttribute(attribute: string): string {
    return this[attribute];
  }

  getAttributes(): string[] {
    return Object.keys(this);
  }
}
