// src/comp/identity/CreateKrakterFormInner.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Fieldset, Select, Stack, useMantineTheme, Box, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { createKrakterFormSchemaType } from "./forms";
import { User, Calendar, VenusAndMars } from 'lucide-react';

export const CreateKrakterFormInner = () => {
  const { control, formState: { errors } } = useFormContext<createKrakterFormSchemaType>();
  const theme = useMantineTheme();

  const inputStyles = {
    input: {
      backgroundColor: theme.colors.dark[7],
      border: `1px solid ${theme.colors.dark[5]}`,
      color: theme.colors.gray[2],
      borderRadius: theme.radius.md,
      fontSize: "14px",
      padding: "12px 16px",
      transition: "all 0.2s ease",
      "&:focus": {
        borderColor: theme.colors.blue[6],
        boxShadow: `0 0 0 2px ${theme.colors.blue[6]}20`,
      },
      "&:hover": {
        borderColor: theme.colors.dark[4],
      }
    },
    label: {
      color: theme.colors.gray[3],
      fontWeight: 600,
      fontSize: "14px",
      marginBottom: "8px",
    },
    error: {
      color: theme.colors.red[4],
      fontSize: "12px",
      marginTop: "4px",
    }
  };

  return (
    <Fieldset variant="unstyled">
      <Stack gap="lg">
        {/* First Name */}
        <Box>
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label={
                  <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <User size={16} color={theme.colors.blue[4]} />
                    <Text style={inputStyles.label}>Nama Depan</Text>
                  </Box>
                }
                placeholder="Masukkan nama depan"
                error={errors.firstname?.message}
                styles={inputStyles}
                size="md"
              />
            )}
          />
        </Box>

        {/* Last Name */}
        <Box>
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label={
                  <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <User size={16} color={theme.colors.blue[4]} />
                    <Text style={inputStyles.label}>Nama Belakang</Text>
                  </Box>
                }
                placeholder="Masukkan nama belakang"
                error={errors.lastname?.message}
                styles={inputStyles}
                size="md"
              />
            )}
          />
        </Box>

        {/* Date of Birth */}
        <Box>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label={
                  <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Calendar size={16} color={theme.colors.blue[4]} />
                    <Text style={inputStyles.label}>Tanggal Lahir</Text>
                  </Box>
                }
                placeholder="Pilih tanggal lahir"
                value={field.value ? new Date(field.value) : null}
                onChange={(value: string | null) => {
                  field.onChange(value || '');
                }}
                error={errors.dateOfBirth?.message}
                valueFormat="YYYY-MM-DD"
                styles={inputStyles}
                size="md"
                maxDate={new Date()}
                minDate={new Date(new Date().getFullYear() - 100, 0, 1)}
              />
            )}
          />
        </Box>

        {/* Gender */}
        <Box>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={
                  <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <VenusAndMars size={16} color={theme.colors.blue[4]} />
                    <Text style={inputStyles.label}>Jenis Kelamin</Text>
                  </Box>
                }
                placeholder="Pilih jenis kelamin"
                data={[
                  { value: "Male", label: "Laki-laki" },
                  { value: "Female", label: "Perempuan" }
                ]}
                error={errors.gender?.message}
                onChange={(value) => field.onChange(value)}
                styles={inputStyles}
                size="md"
              />
            )}
          />
        </Box>
      </Stack>
    </Fieldset>
  );
};