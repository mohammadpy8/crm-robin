import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Loader2, Info } from "lucide-react";

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      duration: 3000,
      position: "top-center",
      icon: <CheckCircle2 className='h-5 w-5 text-emerald-500' />,
      style: {
        background: "#fff",
        color: "#0f172a",
        fontFamily: "IRANYekan",
        padding: "16px 20px",
        borderRadius: "12px",
        border: "1px solid #d1fae5",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
        maxWidth: "500px",
      },
    }),

  error: (message: string) =>
    toast.error(message, {
      duration: 4000,
      position: "top-center",
      icon: <XCircle className='h-5 w-5 text-red-500' />,
      style: {
        background: "#fff",
        color: "#0f172a",
        fontFamily: "IRANYekan",
        padding: "16px 20px",
        borderRadius: "12px",
        border: "1px solid #fecaca",
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
        maxWidth: "500px",
      },
    }),

  loading: (message: string) =>
    toast.loading(message, {
      position: "top-center",
      icon: <Loader2 className='h-5 w-5 animate-spin text-blue-500' />,
      style: {
        background: "#fff",
        color: "#0f172a",
        fontFamily: "IRANYekan",
        padding: "16px 20px",
        borderRadius: "12px",
        border: "1px solid #dbeafe",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
        maxWidth: "500px",
      },
    }),

  info: (message: string) =>
    toast(message, {
      duration: 3000,
      position: "top-center",
      icon: <Info className='h-5 w-5 text-blue-500' />,
      style: {
        background: "#fff",
        color: "#0f172a",
        fontFamily: "IRANYekan",
        padding: "16px 20px",
        borderRadius: "12px",
        border: "1px solid #dbeafe",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
        maxWidth: "500px",
      },
    }),

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) =>
    toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        position: "top-center",
        style: {
          padding: "16px 20px",
          borderRadius: "12px",
          maxWidth: "500px",
        },
        success: {
          icon: <CheckCircle2 className='h-5 w-5 text-emerald-500' />,
          style: {
            background: "#fff",
            border: "1px solid #d1fae5",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
          },
        },
        error: {
          icon: <XCircle className='h-5 w-5 text-red-500' />,
          style: {
            background: "#fff",
            border: "1px solid #fecaca",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
          },
        },
        loading: {
          icon: <Loader2 className='h-5 w-5 animate-spin text-blue-500' />,
          style: {
            background: "#fff",
            border: "1px solid #dbeafe",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
          },
        },
      },
    ),
};
