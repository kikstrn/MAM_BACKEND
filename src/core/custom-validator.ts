import { ExposeOptions, Transform, TransformFnParams } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsObjectID(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectID',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isValidObjectId(value);
        },
        defaultMessage(){
            return `${propertyName} is not a valid ObjectID`;
        }
      },
    });
  };
}

export const ExposeId = (options?: ExposeOptions) => {
  return function (target: Object, propertyKey: string) {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(target, propertyKey);
  };
}
