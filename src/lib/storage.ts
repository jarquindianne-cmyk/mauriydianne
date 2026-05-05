import { useEffect, useState } from "react";
import initialData from "./initialData.json";

export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
      
      const defaultRaw = (initialData as any)[key];
      if (defaultRaw) return JSON.parse(defaultRaw) as T;

      return initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

export function useEditMode() {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setEdit(true);
  }, []);
  return [edit, setEdit] as const;
}
