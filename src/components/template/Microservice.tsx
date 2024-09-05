import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getSpec } from '../../apis/template';
import styles from '../styles/Microservice.module.css';

interface MicroserviceProps {
  imageName: string;
}

export default function Microservice({
  imageName,
}: MicroserviceProps) {
  const [isSpecShown, setIsSpecShown] = useState(false);
  const [spec, setSpec] = useState([]);
  const [isSpecCalled, setIsSpecCalled] = useState(false);

  const handleGetSpec = () => {
    if (!isSpecCalled) {
      const parsedImageName = imageName.split('/');
      if (parsedImageName.length > 1) {
        fetchWithHandler(() => getSpec({
          repoName: parsedImageName[0],
          imageName: parsedImageName[1],
        }), {
          onSuccess: (response) => {
            console.log(response);
            const obj = response.data;
            setSpec(Object.keys(obj).map((key) => [key, obj[key]]));
          },
          onError: (error) => {
            console.error(error);
          },
        });
      }

      setIsSpecCalled(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsSpecShown((prev) => !prev);
          handleGetSpec();
        }}
      >
        {imageName}
      </button>
      {isSpecShown
      && (

      <ul className={styles.specContainer}>
        {spec.map(([key, value]) => (
          <li
            key={key}
            className={styles.spec}
          >
            <div className={styles.specValue}>{key}</div>
            :
            <div className={styles.specValue}>{value}</div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
