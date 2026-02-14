import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	accountName?: string;
	isLoading?: boolean;
}

export function DeleteModal({
	isOpen,
	onClose,
	onConfirm,
	accountName,
	isLoading = false,
}: DeleteModalProps) {
	return (
		<Modal
			backdrop="opaque"
			classNames={{
				backdrop: "bg-black/20 backdrop-blur-sm",
				base: "border border-gray-200 bg-white shadow-2xl",
				closeButton:
					"hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-700",
			}}
			isOpen={isOpen}
			onClose={onClose}
			placement="center"
			size="md"
		>
			<ModalContent>
				{(onModalClose) => (
					<>
						<ModalHeader className="flex flex-col gap-0 border-gray-100 border-b pb-4">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50">
									<AlertTriangle className="h-5 w-5 text-red-600" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 text-lg">
										تأیید حذف سازمان
									</h3>
									<p className="mt-0.5 text-gray-500 text-xs">
										این عملیات غیرقابل بازگشت است
									</p>
								</div>
							</div>
						</ModalHeader>
						<ModalBody>
							<div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-gray-700 text-sm">
								{accountName ? (
									<>
										آیا از حذف سازمان{" "}
										<span className="font-bold text-primary">{accountName}</span> مطمئن
										هستید؟
									</>
								) : (
									"آیا از حذف این سازمان اطمینان دارید؟"
								)}
							</div>
						</ModalBody>
						<ModalFooter className="gap-2 border-gray-100 border-t pt-4">
							<Button
								isDisabled={isLoading}
								onPress={onModalClose}
								radius="lg"
								size="md"
								startContent={<X className="h-4 w-4" />}
								variant="bordered"
							>
								انصراف
							</Button>
							<Button
								className="bg-red-600 text-white hover:bg-red-700"
								isLoading={isLoading}
								onPress={() => {
									onConfirm();
									onModalClose();
								}}
								radius="lg"
								size="md"
								startContent={!isLoading && <Trash2 className="h-4 w-4" />}
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
