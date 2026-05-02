import { useLocalState } from "@/lib/storage";

type Props = {
  storageKey: string;
  defaultValue: string;
  editMode: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
};

export const EditableText = ({
  storageKey,
  defaultValue,
  editMode,
  as: Tag = "span",
  className = "",
  multiline = false,
}: Props) => {
  const [value, setValue] = useLocalState<string>(storageKey, defaultValue);

  if (editMode) {
    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className={`${className} bg-transparent w-full resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 rounded`}
        />
      );
    }
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${className} bg-transparent w-full text-center focus:outline-none focus:ring-1 focus:ring-primary/40 rounded`}
      />
    );
  }
  return <Tag className={className}>{value}</Tag>;
};
