import { useRef } from "react";
import {
  XIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
} from "lucide-react";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  variant: "warning" | "success" | "error" | "info";
}

const variantStyles = {
  warning: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    iconColor: "text-amber-400",
    buttonBgColor: "bg-amber-600",
    buttonHoverColor: "hover:bg-amber-700",
    icon: AlertTriangleIcon,
  },
  success: {
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    iconColor: "text-green-400",
    buttonBgColor: "bg-green-600",
    buttonHoverColor: "hover:bg-green-700",
    icon: CheckCircleIcon,
  },
  error: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-400",
    buttonBgColor: "bg-red-600",
    buttonHoverColor: "hover:bg-red-700",
    icon: XCircleIcon,
  },
  info: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    iconColor: "text-blue-400",
    buttonBgColor: "bg-blue-600",
    buttonHoverColor: "hover:bg-blue-700",
    icon: InfoIcon,
  },
};

export default function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  actionLabel,
  onAction,
  variant,
}: AlertDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  if (isOpen) {
    dialogRef.current?.showModal();
  }

  const {
    bgColor,
    textColor,
    iconColor,
    buttonBgColor,
    buttonHoverColor,
    icon: Icon,
  } = variantStyles[variant];

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg bg-white p-0 shadow-xl"
      onClose={onClose}
    >
      <div className="flex max-w-md flex-col">
        <div
          className={`flex items-center justify-between border-b border-gray-200 ${bgColor} px-4 py-3`}
        >
          <div className="flex items-center space-x-2">
            <Icon className={`h-6 w-6 ${iconColor}`} />
            <h2
              className={`text-lg font-semibold ${textColor}`}
              id="dialog-title"
            >
              {title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Close dialog"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-4">
          <p className="text-sm text-gray-500" id="dialog-description">
            {description}
          </p>
        </div>

        <div className="flex justify-end space-x-3 bg-gray-50 px-4 py-3">
          <button
            onClick={handleClose}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className={`rounded-md ${buttonBgColor} ${buttonHoverColor} px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
