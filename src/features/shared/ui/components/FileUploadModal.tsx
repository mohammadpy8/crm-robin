import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
  isLoading?: boolean;
  title: string;
  description?: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

export function FileUploadModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  title,
  description,
  acceptedFormats = [".xlsx", ".xls"],
  maxSizeMB = 10,
}: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");

  const validateFile = (selectedFile: File): boolean => {
    setError("");

    const extension = selectedFile.name.slice(selectedFile.name.lastIndexOf("."));
    if (!acceptedFormats.some((format) => format.toLowerCase() === extension.toLowerCase())) {
      setError(`فقط فایل‌های ${acceptedFormats.join(", ")} مجاز هستند`);
      return false;
    }

    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    onSubmit(file);
  };

  const handleClose = () => {
    setFile(null);
    setError("");
    onClose();
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='lg'
      classNames={{
        backdrop: "bg-[#D9D9D9]/70",
      }}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 text-right'>
          <span className='text-lg font-semibold'>{title}</span>
          {description && <span className='text-sm text-default-500 font-normal'>{description}</span>}
        </ModalHeader>

        <ModalBody className='gap-4'>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              dragActive ? "border-primary bg-primary-50" : "border-default-300 hover:border-default-400"
            }`}
          >
            <input
              type='file'
              id='file-upload-input'
              className='hidden'
              accept={acceptedFormats.join(",")}
              onChange={handleFileChange}
              disabled={isLoading}
            />

            {!file ? (
              <label htmlFor='file-upload-input' className='flex flex-col items-center justify-center cursor-pointer'>
                <Upload className='w-12 h-12 text-default-400 mb-4' />
                <span className='text-sm text-default-600 mb-2'>فایل را اینجا رها کنید یا کلیک کنید</span>
                <span className='text-xs text-default-400'>فرمت‌های مجاز: {acceptedFormats.join(", ")}</span>
                <span className='text-xs text-default-400 mt-1'>حداکثر حجم: {maxSizeMB} مگابایت</span>
              </label>
            ) : (
              <div className='flex items-center gap-3 bg-default-100 p-4 rounded-lg'>
                <FileSpreadsheet className='text-success w-10 h-10 shrink-0' />
                <div className='flex-1 min-w-0'>
                  <div className='text-sm font-medium truncate'>{file.name}</div>
                  <div className='text-xs text-default-400'>{(file.size / 1024).toFixed(1)} کیلوبایت</div>
                </div>
                <Button isIconOnly variant='light' size='sm' onPress={removeFile} isDisabled={isLoading}>
                  <X className='w-4 h-4' />
                </Button>
              </div>
            )}
          </div>

          {error && <div className='text-sm text-danger text-right bg-danger-50 p-3 rounded-lg'>{error}</div>}
        </ModalBody>

        <ModalFooter>
          <Button variant='light' color='danger' onPress={handleClose} isDisabled={isLoading}>
            انصراف
          </Button>
          <Button color='primary' onPress={handleSubmit} isLoading={isLoading} isDisabled={!file || isLoading}>
            آپلود فایل
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
