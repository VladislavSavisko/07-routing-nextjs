"use client";

import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function NotePreview() {
  const { id } = useParams();
  const router = useRouter();
  const handlePrevious = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const createdDate = `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={handlePrevious}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={handlePrevious} className={css.backBtn36}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.down}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>{createdDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}