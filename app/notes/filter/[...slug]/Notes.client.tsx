"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import type { Note } from "@/types/note";
import css from "./NotesPage.module.css";

type Props = {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  tag?: string;
};

export default function NotesClient({ initialData, tag }: Props) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(searchText, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, tag]);

  const notes = useQuery({
    queryKey: ["notes", debouncedSearch, currentPage, tag],
    queryFn: () => fetchNotes(debouncedSearch, currentPage, 9, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

  const totalPages = notes.data?.totalPages ?? 0;

  const handleSearchChange = (newSearch: string): void => {
    setSearchText(newSearch);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchText} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
          disabled={isModalOpen}
        >
          Create note +
        </button>
      </header>

      {notes.isLoading && <p>Loading...</p>}
      {notes.isError && <p>Error loading notes.</p>}
      {!notes.isLoading && !notes.isError && (
        <NoteList notes={notes.data?.notes ?? []} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
