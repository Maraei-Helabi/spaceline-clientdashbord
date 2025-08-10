"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { FileInput } from "@/components/ui/fileInput";
import { Input } from "@/components/ui/input";
import { RenderFiles } from "@/components/ui/render-files";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { localizedFormat } from "@/lib/date-fns";
import { cn } from "@/lib/utils";
import { fileInput } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod/mini";

const schema = z.object({
  files: z.array(fileInput),
  first_name: z.string().check(z.minLength(1, "required")),
  father_name: z.string().check(z.minLength(1, "required")),
  last_name: z.string().check(z.minLength(1, "required")),
  grand_father_name: z.string().check(z.minLength(1, "required")),
  username: z.string().check(z.minLength(1, "required")),
  birth_date: z.string("required").check(z.minLength(1, "required")),
  gender: z.string("required").check(z.minLength(1, "required")),
  job: z.string().check(z.minLength(1, "required")),
  nationality: z.string().check(z.minLength(1, "required")),
  idType: z.string("required").check(z.minLength(1, "required")),
  idNumber: z.string().check(z.minLength(1, "required")),
  release_date: z.string("required").check(z.minLength(1, "required")),
  issuing_authority: z.string().check(z.minLength(1, "required")),
  end_date: z.string("required").check(z.minLength(1, "required")),
  country: z.string("required").check(z.minLength(1, "required")),
  governorate: z.string("required").check(z.minLength(1, "required")),
  city: z.string().check(z.minLength(1, "required")),
  neighborhood: z.string().check(z.minLength(1, "required")),
  street: z.string().check(z.minLength(1, "required")),
  address: z.string().check(z.minLength(1, "required")),
  prominent_landmark: z.string().check(z.minLength(1, "required")),
  residence: z.string().check(z.minLength(1, "required")),
  phone: z.string().check(z.minLength(9, "phone_number_at_least")),
  email: z.string().check(z.minLength(1, "required")),
  note: z.string().check(z.minLength(1, "required")),
});

type PersonalSchemaT = z.infer<typeof schema>;

const isEditing = false 

export const PersonalProfile = () => {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("validation");

  const [user, setUser] = useState<Partial<PersonalSchemaT>>({});

  // const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PersonalSchemaT>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = (values: PersonalSchemaT) => {
    setUser(values);
    // setIsEditing(false);
  };

  const onEditProfile = () => {
    reset({ ...user, files: [] });
    // setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset to original data
    // setIsEditing(false);
  };

  const personalDetails = [
    {
      label: t("fullName"),
      value: `${user.first_name ?? ""} ${user.father_name ?? ""} ${
        user.grand_father_name ?? ""
      } ${user.last_name ?? ""} ${user.username ?? ""}`.trim(),
    },
    {
      label: t("birthDate"),
      value: !!user.birth_date
        ? localizedFormat(new Date(user.birth_date), "EEE MMM, yyyy")
        : "",
    },
    {
      label: t("gender"),
      value: user.gender,
    },
    {
      label: t("job"),
      value: user.job,
    },
    {
      label: t("nationality"),
      value: user.nationality,
    },
    {
      label: t("idType"),
      value: user.idType,
    },
    {
      label: t("idNumber"),
      value: user.idNumber,
    },
    {
      label: t("releaseDate"),
      value: !!user.release_date
        ? localizedFormat(new Date(user.release_date), "EEE MMM, yyyy")
        : "",
    },
    {
      label: t("issuingAuthority"),
      value: user.issuing_authority,
    },
    {
      label: t("endDate"),
      value: !!user.end_date
        ? localizedFormat(new Date(user.end_date), "EEE MMM, yyyy")
        : "",
    },
  ];

  const customerSiteInformation = [
    {
      label: t("country"),
      value: user.country,
    },
    {
      label: t("governorate"),
      value: user.governorate,
    },
    {
      label: t("city"),
      value: user.city,
    },
    {
      label: t("neighborhood"),
      value: user.neighborhood,
    },
    {
      label: t("street"),
      value: user.street,
    },
    {
      label: t("address"),
      value: user.address,
    },
    {
      label: t("prominentLandmark"),
      value: user.prominent_landmark,
    },
  ];

  const contactInformation = [
    {
      label: t("residence"),
      value: user.residence,
    },
    {
      label: t("phone"),
      value: user.phone,
    },
    {
      label: t("email"),
      value: user.email,
    },
    {
      label: t("note"),
      value: user.note,
    },
  ];

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={!isValid || !isDirty}>
              {t("saveChanges")}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onEditProfile}>{t("editProfile")}</Button>
          </>
        )}
      </div>

      {/* Personal Details */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("personalDetails")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Input
                label={t("username")}
                className="col-span-12 sm:col-span-6"
                {...register("username")}
                error={
                  errors.username?.message
                    ? tValidation(errors.username.message)
                    : undefined
                }
              />
              <Input
                label={t("firstName")}
                className="col-span-12 sm:col-span-6"
                {...register("first_name")}
                error={
                  errors.first_name?.message
                    ? tValidation(errors.first_name.message)
                    : undefined
                }
              />

              <Input
                label={t("fatherName")}
                className="col-span-12 sm:col-span-6"
                {...register("father_name")}
                error={
                  errors.father_name?.message
                    ? tValidation(errors.father_name.message)
                    : undefined
                }
              />

              <Input
                label={t("grandFatherName")}
                className="col-span-12 sm:col-span-6"
                {...register("grand_father_name")}
                error={
                  errors.grand_father_name?.message
                    ? tValidation(errors.grand_father_name.message)
                    : undefined
                }
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("lastName")}
                {...register("last_name")}
                error={
                  errors.last_name?.message
                    ? tValidation(errors.last_name.message)
                    : undefined
                }
              />

              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="col-span-12 sm:col-span-6"
                    label={t("birthDate")}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : "")
                    }
                    error={
                      errors.birth_date?.message
                        ? tValidation(errors.birth_date.message)
                        : undefined
                    }
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={t("gender")}
                    placeholder={t("gender")}
                    options={[
                      { name: "Male", id: "male" },
                      { name: "Female", id: "female" },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    error={
                      errors.gender?.message
                        ? tValidation(errors.gender.message)
                        : undefined
                    }
                  />
                )}
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("job")}
                {...register("job")}
                error={
                  errors.job?.message
                    ? tValidation(errors.job.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("nationality")}
                {...register("nationality")}
                error={
                  errors.nationality?.message
                    ? tValidation(errors.nationality.message)
                    : undefined
                }
              />
              <Controller
                name="idType"
                control={control}
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={t("idType")}
                    placeholder={t("idType")}
                    options={[
                      { name: "ID", id: 22 },
                      { name: "Passport", id: 5 },
                    ]}
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    getOptionValue={(option) => String(option.id)}
                    getOptionLabel={(option) => option.name}
                    error={
                      errors.idType?.message
                        ? tValidation(errors.idType.message)
                        : undefined
                    }
                  />
                )}
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("idNumber")}
                {...register("idNumber")}
                error={
                  errors.idNumber?.message
                    ? tValidation(errors.idNumber.message)
                    : undefined
                }
              />
              <Controller
                name="release_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="col-span-12 sm:col-span-6"
                    label={t("releaseDate")}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : "")
                    }
                    error={
                      errors.release_date?.message
                        ? tValidation(errors.release_date.message)
                        : undefined
                    }
                  />
                )}
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("issuingAuthority")}
                {...register("issuing_authority")}
                error={
                  errors.issuing_authority?.message
                    ? tValidation(errors.issuing_authority.message)
                    : undefined
                }
              />
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="col-span-12"
                    label={t("endDate")}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : "")
                    }
                    error={
                      errors.end_date?.message
                        ? tValidation(errors.end_date.message)
                        : undefined
                    }
                  />
                )}
              />
            </>
          ) : (
            <>
              {personalDetails.map((detail) => (
                <div key={detail.label}>
                  <p className="font-medium">{detail.label}:</p>
                  <p className="text-muted-foreground">
                    {detail.value || "--"}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("customerSiteInformation")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={t("country")}
                    placeholder={t("country")}
                    options={[
                      { name: "Yemen", id: 4 },
                      { name: "Saudi", id: 5 },
                      { name: "Egypt", id: 1 },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    getOptionValue={(option) => String(option.id)}
                    getOptionLabel={(option) => option.name}
                    error={
                      errors.country?.message
                        ? tValidation(errors.country.message)
                        : undefined
                    }
                  />
                )}
              />

              <Controller
                name="governorate"
                control={control}
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={t("governorate")}
                    placeholder={t("governorate")}
                    options={[
                      { name: "Hadramout", id: 22 },
                      { name: "Aden", id: 5 },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    getOptionValue={(option) => String(option.id)}
                    getOptionLabel={(option) => option.name}
                    error={
                      errors.governorate?.message
                        ? tValidation(errors.governorate.message)
                        : undefined
                    }
                  />
                )}
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("city")}
                {...register("city")}
                error={
                  errors.city?.message
                    ? tValidation(errors.city.message)
                    : undefined
                }
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("neighborhood")}
                {...register("neighborhood")}
                error={
                  errors.neighborhood?.message
                    ? tValidation(errors.neighborhood.message)
                    : undefined
                }
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("street")}
                {...register("street")}
                error={
                  errors.street?.message
                    ? tValidation(errors.street.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("address")}
                {...register("address")}
                error={
                  errors.address?.message
                    ? tValidation(errors.address.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12"
                label={t("prominentLandmark")}
                {...register("prominent_landmark")}
                error={
                  errors.prominent_landmark?.message
                    ? tValidation(errors.prominent_landmark.message)
                    : undefined
                }
              />
            </>
          ) : (
            <>
              {customerSiteInformation.map((detail) => (
                <div key={detail.label}>
                  <p className="font-medium">{detail.label}:</p>
                  <p className="text-muted-foreground">
                    {detail.value || "--"}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("contactInformation")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Input
                className="col-span-12"
                label={t("residence")}
                {...register("residence")}
                error={
                  errors.residence?.message
                    ? tValidation(errors.residence.message)
                    : undefined
                }
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("phone")}
                {...register("phone")}
                error={
                  errors.phone?.message
                    ? tValidation(errors.phone.message, { count: 9 })
                    : undefined
                }
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("email")}
                {...register("email")}
                error={
                  errors.email?.message
                    ? tValidation(errors.email.message)
                    : undefined
                }
              />

              <Textarea
                className="col-span-12"
                label={t("note")}
                {...register("note")}
                error={
                  errors.note?.message
                    ? tValidation(errors.note.message)
                    : undefined
                }
              />
            </>
          ) : (
            <>
              {contactInformation.map((detail) => (
                <div key={detail.label}>
                  <p className="font-medium">{detail.label}:</p>
                  <p className="text-muted-foreground">
                    {detail.value || "--"}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {tCommon("uploaded_files")}
        </h3>
        <div className={cn("space-y-4")}>
          {isEditing ? (
            <Controller
              control={control}
              name="files"
              render={({ field }) => (
                <FileInput
                  selectedFiles={field.value}
                  onChange={(files) => field.onChange(files)}
                />
              )}
            />
          ) : (
            <>
              {!!user.files && user.files?.length > 0 ? (
                <RenderFiles viewOnly files={user.files} />
              ) : (
                <p className="text-muted-foreground">
                  {tCommon("no_data_found")}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
};
