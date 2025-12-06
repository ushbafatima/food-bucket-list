import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "toast-sonner",
          description: "toast-description-sonner",
          actionButton: "toast-action-button-sonner",
          cancelButton: "toast-cancel-button-sonner",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

