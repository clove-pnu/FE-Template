import styles from '../styles/InputWithLabel.module.css';

interface InputWithLabelProps {
  name: string;
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputWithLabel({
  name,
  id,
  value,
  setValue,
}: InputWithLabelProps) {
  return (
    <label
      htmlFor={id}
      className={styles.label}
    >
      <div className={styles.labelName}>{name}</div>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
