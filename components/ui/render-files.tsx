import { useState } from "react";
import { CustomFileType } from "./fileInput";
import {
  FileSpreadsheet,
  FileIcon,
  FileText,
  X,
  Download,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { useTranslations } from "next-intl";

type RenderFilesProps = {
  viewOnly?: boolean;
  files: CustomFileType[];
  handleRemove?: (val: string) => void;
};

// File Viewer Component
const FileViewer = ({ file }: { file: CustomFileType }) => {
  const [imageError, setImageError] = useState(false);
  const t = useTranslations("common");

  const renderFileContent = () => {
    if (file.name.endsWith(".pdf")) {
      return (
        <div className="w-full h-[600px]">
          <iframe
            src={file.preview}
            className="w-full h-full border-0 rounded-lg"
            title={file.name}
            onError={() => setImageError(true)}
          />
        </div>
      );
    } else if (
      file.name.endsWith(".jpg") ||
      file.name.endsWith(".jpeg") ||
      file.name.endsWith(".png") ||
      file.name.endsWith(".gif") ||
      file.name.endsWith(".webp") ||
      file.name.endsWith(".svg")
    ) {
      if (imageError) {
        return (
          <div className="flex flex-col items-center justify-center max-h-[400px] text-center">
            <FileIcon className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-lg font-medium mb-2">{file.name}</p>
            <p className="text-muted-foreground mb-4">
              {t("image_could_not_be_loaded")}
            </p>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = file.preview;
                link.download = file.name;
                link.click();
              }}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {t("download_file")}
            </Button>
          </div>
        );
      }
      return (
        <div className="flex justify-center">
          <Image
            src={file.preview}
            alt={file.name}
            width={800}
            height={600}
            className="max-w-full h-auto rounded-lg object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      );
    } else if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
      return (
        <div className="flex flex-col items-center justify-center max-h-[400px] text-center">
          <FileSpreadsheet className="w-16 h-16 text-green-500 mb-4" />
          <p className="text-lg font-medium mb-2">{file.name}</p>
          <p className="text-muted-foreground mb-4">
            {t("excel_cannot_preview")}
          </p>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = file.preview;
              link.download = file.name;
              link.click();
            }}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {t("download_file")}
          </Button>
        </div>
      );
    } else if (file.name.endsWith(".docx")) {
      return (
        <div className="flex flex-col items-center justify-center max-h-[400px] text-center">
          <FileText className="w-16 h-16 text-blue-500 mb-4" />
          <p className="text-lg font-medium mb-2">{file.name}</p>
          <p className="text-muted-foreground mb-4">
            {t("word_cannot_preview")}
          </p>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = file.preview;
              link.download = file.name;
              link.click();
            }}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {t("download_file")}
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center max-h-[400px] text-center">
          <FileIcon className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-lg font-medium mb-2">{file.name}</p>
          <p className="text-muted-foreground mb-4">
            {t("filetype_cannot_preview")}
          </p>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = file.preview;
              link.download = file.name;
              link.click();
            }}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {t("download_file")}
          </Button>
        </div>
      );
    }
  };

  return <div className="w-full max-w-4xl mx-auto">{renderFileContent()}</div>;
};

export const RenderFiles = (props: RenderFilesProps) => {
  const { viewOnly, files } = props;
  const [showFileIcon, setShowFileIcon] = useState(false);
  const [selectedFile, setSelectedFile] = useState<CustomFileType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileClick = (file: CustomFileType) => {
    setSelectedFile(file);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {files.map((file) => (
          <div
            key={`files-${file.id}`}
            className="flex items-center justify-between rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* File Icon/Preview */}
              <div className="flex-shrink-0">
                {file.name.endsWith(".pdf") ? (
                  <FileText className="w-8 h-8 text-red-500" />
                ) : file.name.endsWith(".xls") ||
                  file.name.endsWith(".xlsx") ? (
                  <FileSpreadsheet className="w-8 h-8 text-green-500" />
                ) : file.name.endsWith(".docx") ? (
                  <FileText className="w-8 h-8 text-blue-500" />
                ) : showFileIcon ? (
                  <FileIcon className="w-8 h-8 text-gray-500" />
                ) : (
                  <Image
                    width={32}
                    height={32}
                    className="rounded w-8 h-8 object-cover"
                    onError={() => setShowFileIcon(true)}
                    src={file.preview}
                    alt={file.name}
                  />
                )}
              </div>

              {/* File Name */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileClick(file);
                }}
                variant="outline"
                size="icon"
                className="h-8 w-8"
                title="View file"
              >
                <Eye className="w-4 h-4" />
              </Button>

              {/* Remove Button */}
              {!viewOnly && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    props.handleRemove?.(file.id);
                  }}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* File Viewer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {selectedFile?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedFile && <FileViewer file={selectedFile} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
