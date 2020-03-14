export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export class Field {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  colSpan?: string;
  hidden?: boolean;
}

export class FieldData {
  name?: string;
  type?: string;
  hidden?: boolean;
  title?: string;
  nlength?: string;
}
