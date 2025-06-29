import { createPortal } from "react-dom";
import { useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface NoteModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function NoteModal({ children }: NoteModalProps) {
  const router = useRouter();
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  // Закриття по натисканню Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Блокування скролу
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Закриття по кліку на фон
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}