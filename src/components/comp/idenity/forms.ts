// src/comp/identity/forms.ts
import { z } from "zod";

export const createKrakterFormSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Nama depan minimal 3 karakter" })
    .max(16, { message: "Nama depan maksimal 16 karakter" }),
  lastname: z
    .string()
    .min(3, { message: "Nama belakang minimal 3 karakter" })
    .max(16, { message: "Nama belakang maksimal 16 karakter" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Tanggal lahir harus diisi" })
    .refine((str) => {
      const date = new Date(str);
      return !isNaN(date.getTime());
    }, { message: "Format tanggal tidak valid" })
    .refine((str) => {
      const date = new Date(str);
      return date <= new Date();
    }, { message: "Tanggal lahir tidak boleh di masa depan" })
    .refine((str) => {
      const date = new Date(str);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      return date >= minDate;
    }, { message: "Tanggal lahir terlalu lama" })
    .refine((str) => {
      const date = new Date(str);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 16);
      return date <= maxDate;
    }, { message: "Minimal usia 16 tahun" }),
  gender: z.enum(["Male", "Female"], { message: "Pilih jenis kelamin yang valid" }),
});

export type createKrakterFormSchemaType = z.infer<typeof createKrakterFormSchema>;