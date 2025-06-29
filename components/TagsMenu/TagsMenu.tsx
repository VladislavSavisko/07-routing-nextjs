"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              className={css.menuLink}
              onClick={toggle}
            >
              All notes
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/Todo`}
              className={css.menuLink}
              onClick={toggle}
            >
              Todo
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/Work`}
              className={css.menuLink}
              onClick={toggle}
            >
              Work
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/Personal`}
              className={css.menuLink}
              onClick={toggle}
            >
              Personal
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/Meeting`}
              className={css.menuLink}
              onClick={toggle}
            >
              Meeting
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/Shopping`}
              className={css.menuLink}
              onClick={toggle}
            >
              Shopping
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}