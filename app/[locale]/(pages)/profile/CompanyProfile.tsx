"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RenderFiles } from "@/components/ui/render-files";
import { FileInput } from "@/components/ui/fileInput";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod/mini";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileInput } from "@/lib/zod.schema";
import { localizedFormat } from "@/lib/date-fns";
import { CustomerDto } from "@/orval/model";

const schema = z.object({
  companyName: z.string().check(z.minLength(1, "required")),
  activity: z.string().check(z.minLength(1, "required")),
  customerType: z.string().check(z.minLength(1, "required")),
  ownerName: z.string().check(z.minLength(1, "required")),
  nationalityTypeOfOwner: z.string().check(z.minLength(1, "required")),
  nationalityTypeNumberOfOwner: z.string().check(z.minLength(1, "required")),
  mobile: z.string().check(z.minLength(9, "phone_number_at_least")),
  activityDocumentType: z.string().check(z.minLength(1, "required")),
  activityDocumentNumber: z.string().check(z.minLength(1, "required")),
  releaseDate: z.string().check(z.minLength(1, "required")),
  issuingAuthority: z.string().check(z.minLength(1, "required")),
  endDate: z.string().check(z.minLength(1, "required")),
  country: z.string().check(z.minLength(1, "required")),
  governorate: z.string().check(z.minLength(1, "required")),
  city: z.string().check(z.minLength(1, "required")),
  neighborhood: z.string().check(z.minLength(1, "required")),
  street: z.string().check(z.minLength(1, "required")),
  address: z.string().check(z.minLength(1, "required")),
  prominent: z.string().check(z.minLength(1, "required")),
  activityAddress: z.string().check(z.minLength(1, "required")),
  email: z.string().check(z.minLength(1, "required")),
  delegateName: z.string().check(z.minLength(1, "required")),
  activityType: z.string().check(z.minLength(1, "required")),
  idType: z.string().check(z.minLength(1, "required")),
  idNumber: z.string().check(z.minLength(1, "required")),
  telephone: z.string().check(z.minLength(1, "required")),
  mobileDelegate: z.string().check(z.minLength(1, "required")),
  note: z.string().check(z.minLength(1, "required")),
  files: z.array(fileInput),
});

type CompanySchemaT = z.infer<typeof schema>;

const isEditing = false;

export const CompanyProfile = ({ customer }: { customer: CustomerDto }) => {
  const t = useTranslations("company");
  const tProfile = useTranslations("profile");
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("validation");
  const locale = useLocale();
  // const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    // reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CompanySchemaT>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (values: CompanySchemaT) => {
    console.log(values);
    // setCompany(values);
    // setIsEditing(false);
  };

  // const onEditProfile = () => {
  // reset({ ...company, files: [] });
  // setIsEditing(true);
  // };

  const handleCancel = () => {
    // setIsEditing(false);
  };

  const customerInformation = [
    {
      label: t("companyName"),
      value: customer.companyName,
    },
    {
      label: t("activity"),
      value: customer.filed,
    },
    {
      label: t("customerType"),
      value:
        locale === "en"
          ? customer.customerTypeName
          : customer.customerTypeNameAr,
    },
    {
      label: t("ownerName"),
      value: customer.ownerName,
    },
    {
      label: t("nationalityTypeOfOwner"),
      value:
        locale === "en"
          ? customer.nationalityTypeName
          : customer.nationalityTypeNameAr,
    },
    {
      label: t("nationalityTypeNumberOfOwner"),
      value: customer.nationalityId,
    },
    {
      label: t("mobile"),
      value: customer.mobile,
    },
  ];

  const requiredDocuments = [
    {
      label: t("activityDocumentType"),
      value: customer.licesnseType,
    },
    {
      label: t("activityDocumentNumber"),
      value: customer.licesnseNo,
    },
    {
      label: t("releaseDate"),
      value: !!customer.licenseIssueDate
        ? localizedFormat(new Date(customer.licenseIssueDate), "EEE MMM, yyyy")
        : "",
    },
    {
      label: t("issuingAuthority"),
      value: customer.licenseIssuePlace,
    },
    {
      label: t("endDate"),
      value: !!customer.licenseExpiryDate
        ? localizedFormat(new Date(customer.licenseExpiryDate), "EEE MMM, yyyy")
        : "",
    },
  ];

  const locationInformation = [
    {
      label: t("country"),
      value: locale === "en" ? customer.countryName : customer.countryNameAr,
    },
    {
      label: tProfile("governorate"),
      value: locale === "en" ? customer.regionName : customer.regionNameAr,
    },
    {
      label: t("city"),
      value: locale === "en" ? customer.cityName : customer.cityNameAr,
    },
    {
      label: t("neighborhood"),
      value: customer.neighborhood,
    },
    {
      label: t("street"),
      value: customer.street,
    },
    {
      label: t("address"),
      value: customer.address,
    },
    {
      label: t("prominent"),
      value: customer.landMark,
    },
  ];

  const contactInformation = [
    {
      label: t("activityAddress"),
      value: customer.address,
    },
    {
      label: t("email"),
      value: customer.email,
    },
    {
      label: t("delegateName"),
      value: customer.nameOfAuthorizedPerson,
    },
    {
      label: t("activityType"),
      value: customer.titleofAuthorizedPerson,
    },
    {
      label: tProfile("idType"),
      value:
        locale === "en"
          ? customer.nationalityTypeName
          : customer.nationalityTypeNameAr,
    },
    {
      label: tProfile("idNumber"),
      value: customer.naionalIdofAuthorizedPerson,
    },
    {
      label: t("telephone"),
      value: customer.telephone,
    },
    {
      label: t("mobileDelegate"),
      value: customer.mobileOfAuthorizedPerson,
    },
    {
      label: t("note"),
      value: customer.note,
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
            {/* <Button onClick={onEditProfile}>{t("editProfile")}</Button> */}
          </>
        )}
      </div>

      {/* Customer Information */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("customerInformation")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Input
                label={t("companyName")}
                className="col-span-12 sm:col-span-6"
                {...register("companyName")}
                error={
                  errors.companyName?.message
                    ? tValidation(errors.companyName.message)
                    : undefined
                }
              />
              <Input
                label={t("activity")}
                className="col-span-12 sm:col-span-6"
                {...register("activity")}
                error={
                  errors.activity?.message
                    ? tValidation(errors.activity.message)
                    : undefined
                }
              />
              <Input
                label={t("customerType")}
                className="col-span-12 sm:col-span-6"
                {...register("customerType")}
                error={
                  errors.customerType?.message
                    ? tValidation(errors.customerType.message)
                    : undefined
                }
              />
              <Input
                label={t("ownerName")}
                className="col-span-12 sm:col-span-6"
                {...register("ownerName")}
                error={
                  errors.ownerName?.message
                    ? tValidation(errors.ownerName.message)
                    : undefined
                }
              />

              <Controller
                control={control}
                name="nationalityTypeOfOwner"
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={t("nationalityTypeOfOwner")}
                    placeholder={t("nationalityTypeOfOwner")}
                    options={[
                      {
                        name: "ID",
                        id: 22,
                      },
                      {
                        name: "Passport",
                        id: 5,
                      },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    getOptionValue={(option) => String(option.id)}
                    getOptionLabel={(option) => option.name}
                  />
                )}
              />

              <Input
                className="col-span-12 sm:col-span-6"
                label={t("nationalityTypeNumberOfOwner")}
                {...register("nationalityTypeNumberOfOwner")}
                error={
                  errors.nationalityTypeNumberOfOwner?.message
                    ? tValidation(errors.nationalityTypeNumberOfOwner.message)
                    : undefined
                }
              />
              <Input
                label={t("mobile")}
                className="col-span-12"
                {...register("mobile")}
                error={
                  errors.mobile?.message
                    ? tValidation(errors.mobile.message, { count: 9 })
                    : undefined
                }
              />
            </>
          ) : (
            <>
              {customerInformation.map((detail) => (
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

      {/* Required Documents */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("requiredDocuments")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("activityDocumentType")}
                {...register("activityDocumentType")}
                error={
                  errors.activityDocumentType?.message
                    ? tValidation(errors.activityDocumentType.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("activityDocumentNumber")}
                {...register("activityDocumentNumber")}
                error={
                  errors.activityDocumentNumber?.message
                    ? tValidation(errors.activityDocumentNumber.message)
                    : undefined
                }
              />
              <Controller
                name="releaseDate"
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
                      errors.releaseDate?.message
                        ? tValidation(errors.releaseDate.message)
                        : undefined
                    }
                  />
                )}
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("issuingAuthority")}
                {...register("issuingAuthority")}
                error={
                  errors.issuingAuthority?.message
                    ? tValidation(errors.issuingAuthority.message)
                    : undefined
                }
              />
              <Controller
                name="endDate"
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
                      errors.endDate?.message
                        ? tValidation(errors.endDate.message)
                        : undefined
                    }
                  />
                )}
              />
            </>
          ) : (
            <>
              {requiredDocuments.map((detail) => (
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

      {/* Location Information */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("locationInformation")}
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
                    label={tProfile("governorate")}
                    placeholder={tProfile("governorate")}
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
                label={t("prominent")}
                {...register("prominent")}
                error={
                  errors.prominent?.message
                    ? tValidation(errors.prominent.message)
                    : undefined
                }
              />
            </>
          ) : (
            <>
              {locationInformation.map((detail) => (
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

      {/* Contact Info */}
      <div className="p-6 rounded-lg border text-card-foreground shadow-sm">
        <h3 className="font-semibold tracking-tight text-lg mb-4">
          {t("contactInfo")}
        </h3>
        <div
          className={cn("space-y-4", isEditing && "grid grid-cols-12 gap-2")}
        >
          {isEditing ? (
            <>
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("activityAddress")}
                {...register("activityAddress")}
                error={
                  errors.activityAddress?.message
                    ? tValidation(errors.activityAddress.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("email")}
                type="email"
                {...register("email")}
                error={
                  errors.email?.message
                    ? tValidation(errors.email.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("delegateName")}
                {...register("delegateName")}
                error={
                  errors.delegateName?.message
                    ? tValidation(errors.delegateName.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("activityType")}
                {...register("activityType")}
                error={
                  errors.activityType?.message
                    ? tValidation(errors.activityType.message)
                    : undefined
                }
              />
              <Controller
                name="idType"
                control={control}
                render={({ field }) => (
                  <Select
                    className="col-span-12 sm:col-span-6"
                    label={tProfile("idType")}
                    placeholder={tProfile("idType")}
                    options={[
                      { name: "ID", id: 22 },
                      { name: "Passport", id: 5 },
                    ]}
                    value={field.value}
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
                label={tProfile("idNumber")}
                {...register("idNumber")}
                error={
                  errors.idNumber?.message
                    ? tValidation(errors.idNumber.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("telephone")}
                {...register("telephone")}
                error={
                  errors.telephone?.message
                    ? tValidation(errors.telephone.message)
                    : undefined
                }
              />
              <Input
                className="col-span-12 sm:col-span-6"
                label={t("mobileDelegate")}
                {...register("mobileDelegate")}
                error={
                  errors.mobileDelegate?.message
                    ? tValidation(errors.mobileDelegate.message)
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

      {/* Uploaded Files */}
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
              {!!customer.customerAttachments &&
              customer.customerAttachments.length > 0 ? (
                <RenderFiles viewOnly files={[]} />
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
