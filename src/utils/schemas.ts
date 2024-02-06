import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Невірний формат електронної пошти').required("Це обов'язкове поле"),
  password: yup
    .string()
    .required("Це обов'язкове поле")
    .min(6, 'Пароль містить не менше ніж з 6 символів'),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  firstName: yup.string().required("Це обов'язкове поле"),
  lastName: yup.string(),
  email: yup
    .string()
    .email('Поле має невірний формат')
    .matches(
      /@(gmail\.com|yahoo\.com|outlook\.com)$/,
      'Дозволено лише gmail, yahoo або outlook адреси'
    )
    .required("Це обов'язкове поле"),
  password: yup
    .string()
    .required("Це обов'язкове поле")
    .min(6, 'Пароль повинен мати не менше ніж з 6 символів'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі не однакові')
    .required("Це обов'язкове поле"),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;

export const createBoardSchema = yup.object({
  name: yup.string().required("Це обов'язкове поле"),
  workspace: yup.object({
    value: yup.string(),
    label: yup.string(),
    id: yup.string(),
  }),
  description: yup.string(),
  color: yup.string(),
});

export type CreateBoardSchema = yup.InferType<typeof createBoardSchema>;

export const createWorkspaceSchema = yup.object({
  name: yup.string().required("Це обов'язкове поле"),
  workspaceType: yup.object({
    value: yup.string(),
    label: yup.string(),
  }),
  description: yup.string(),
});

export type CreateWorkspaceSchema = yup.InferType<typeof createWorkspaceSchema>;
