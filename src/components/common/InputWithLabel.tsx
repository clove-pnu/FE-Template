import styles from '../styles/InputWithLabel.module.css';

interface InputWithLabelProps {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputWithLabel({
  name,
  value,
  setValue,
}: InputWithLabelProps) {
  return (
    <label
      htmlFor={name}
      className={styles.label}
    >
      <div className={styles.labelName}>{name}</div>
      <input
        type="text"
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
