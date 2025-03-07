"use client";

import { useAlertDialog } from "../provider/useAlertDialog";

export default function AlertTestButtons() {
  const { openDialog } = useAlertDialog();

  const handleOpenDialog = (
    variant: "warning" | "success" | "error" | "info"
  ) => {
    const dialogProps = {
      warning: {
        title: "Warning",
        description:
          "This action cannot be undone. Are you sure you want to proceed?",
        actionLabel: "Confirm",
        onAction: () => console.log("Warning action confirmed"),
      },
      success: {
        title: "Success",
        description: "The operation was completed successfully.",
        actionLabel: "OK",
        onAction: () => console.log("Success acknowledged"),
      },
      error: {
        title: "Error",
        description:
          "An error occurred while processing your request. Please try again.",
        actionLabel: "Try Again",
        onAction: () => console.log("Retrying after error"),
      },
      info: {
        title: "Information",
        description: "Here's some important information you should know.",
        actionLabel: "Got it",
        onAction: () => console.log("Information acknowledged"),
      },
    };

    openDialog({ ...dialogProps[variant], variant });
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleOpenDialog("warning")}
        className="rounded-md bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        Warning
      </button>
      <button
        onClick={() => handleOpenDialog("success")}
        className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Success
      </button>
      <button
        onClick={() => handleOpenDialog("error")}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Error
      </button>
      <button
        onClick={() => handleOpenDialog("info")}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Info
      </button>
    </div>
  );
}
