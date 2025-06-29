"use client";

import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  return (
    <Modal onClose={() => window.history.back}>
      <NotePreview />
    </Modal>
  );
}