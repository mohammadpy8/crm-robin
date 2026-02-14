import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  isLoading?: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, userName, isLoading = false }: DeleteModalProps) {
  return (
    <Modal
      backdrop='opaque'
      classNames={{
        backdrop: "bg-black/20 backdrop-blur-sm",
        base: "border border-gray-200 bg-white shadow-2xl",
        closeButton: "hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-700",
      }}
      isOpen={isOpen}
      onClose={onClose}
      placement='center'
      size='md'
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className='flex flex-col gap-0 border-gray-100 border-b pb-4'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50'>
                    <AlertTriangle className='h-5 w-5 text-red-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 text-lg'>تأیید حذف کاربر</h3>
                    <p className='mt-0.5 text-gray-500 text-xs'>این عملیات غیرقابل بازگشت است</p>
                  </div>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className='px-6 py-6'>
              <div className='space-y-4'>
                <div className='rounded-lg border border-amber-100 bg-amber-50 p-4'>
                  <p className='text-gray-700 text-sm leading-relaxed'>
                    {userName ? (
                      <>
                        آیا از حذف کاربر{" "}
                        <span className='rounded bg-amber-100 px-2 py-0.5 font-bold text-primary'>{userName}</span>{" "}
                        اطمینان کامل دارید؟
                      </>
                    ) : (
                      "آیا از حذف این کاربر اطمینان کامل دارید؟"
                    )}
                  </p>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className='gap-2 border-gray-100 border-t pt-4'>
              <Button
                className='border-gray-200 bg-white font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50'
                isDisabled={isLoading}
                onPress={onModalClose}
                radius='lg'
                size='md'
                startContent={<X className='h-4 w-4' />}
                variant='bordered'
              >
                انصراف
              </Button>
              <Button
                className='bg-linear-to-br from-red-500 to-red-600 font-medium text-white shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02] hover:shadow-red-500/40 hover:shadow-xl'
                isLoading={isLoading}
                onPress={() => {
                  onConfirm();
                  onModalClose();
                }}
                radius='lg'
                size='md'
                startContent={!isLoading && <Trash2 className='h-4 w-4' />}
              >
                {isLoading ? "در حال حذف..." : "بله، حذف قطعی"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
