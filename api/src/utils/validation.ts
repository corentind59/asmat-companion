import * as yup from 'yup';
import { BadRequest } from '@corentind/expressive';

export async function validateWith<S extends yup.AnyObjectSchema>(schema: S, value: any): Promise<yup.Asserts<typeof schema>> {
    try {
        return await schema.validate(value);
    } catch (e: unknown) {
        if (e instanceof yup.ValidationError) {
            throw new BadRequest({ code: 'validation-error', message: e.message });
        }
        throw e;
    }
}
