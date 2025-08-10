import { useCallback, useId } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

import { useTranslations } from "next-intl";
import { RenderFiles } from "./render-files";

export type CustomFileType = {
  id: string;
  name: string;
  type: string;
  size: string;
  file: string | ArrayBuffer | null | undefined;
  preview: string;
  origin_file: File | null;
};

type AvailableFileTypes =
  | ".jpeg"
  | ".png"
  | ".jpg"
  | ".svg"
  | ".webp"
  | ".pdf"
  | ".xlsx"
  | ".csv"
  | ".xls";

type FileInputType = {
  label?: string;
  id?: string;
  error?: string;
  name?: string;
  className?: string;
  containerClassName?: string;
  fileType?: "binary" | "base64";
  dropzoneProps?: Omit<DropzoneOptions, "accept">;
  accept?: AvailableFileTypes[];
  selectedFiles?: CustomFileType[];
  onChange?: (file: CustomFileType[]) => void;
  onRemove?: (fileId: string) => void;
  render?: () => React.ReactNode;
};

const FileInput = (props: FileInputType) => {
  const {
    error,
    fileType = "base64",
    dropzoneProps,
    name,
    selectedFiles = [],
    onChange,
    onRemove,
    className,
    containerClassName,
    render,
  } = props;
  const t = useTranslations("common");
  const id = useId();

  const handleOnDrop = useCallback(
    (acceptedFiles: File[]) => {
      let filesList: CustomFileType[] = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        if (fileType === "binary") {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsDataURL(file);
        }

        reader.onloadend = (e) => {
          const fileInfo = {
            id:
              self?.crypto?.randomUUID() ||
              Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed()} KB`,
            file: e.target?.result,
            preview: URL.createObjectURL(file),
            origin_file: file,
          };
          filesList = [...filesList, fileInfo];
          if (acceptedFiles?.length === filesList.length) {
            const updatedFiles = [...selectedFiles, ...filesList];
            onChange?.(updatedFiles);
          }
        };
      });
    },
    [fileType, onChange, selectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneProps,
    multiple: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: handleOnDrop,
  });

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = selectedFiles.filter((file) => file.id !== fileId);
    onChange?.(updatedFiles);
    onRemove?.(fileId);
  };

  return (
    <div className={containerClassName}>
      {/* File Upload Area */}
      <div className={className} {...getRootProps()}>
        <input name={name} id={props.id || id} {...getInputProps()} />
        {render?.() ?? (
          <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-12 h-12 text-blue-500" />
              <p className="text-base font-medium text-center">
                {t("drag_and_drop")}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("supported_formats")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("max_file_size")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {!!error && <span className="text-sm text-red-600 mt-2">{error}</span>}

      {/* Uploaded Files Display */}
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">{t("uploaded_files")}</h3>

          <RenderFiles
            files={selectedFiles}
            handleRemove={(id) => handleRemoveFile(id)}
          />
        </div>
      )}
    </div>
  );
};

export { FileInput };
