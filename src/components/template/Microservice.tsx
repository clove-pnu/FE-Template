import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getSpec } from '../../apis/template';
import styles from '../styles/Microservice.module.css';

interface MicroserviceProps {
  imageName: string;
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  setVolVals: React.Dispatch<React.SetStateAction<[string, string, string][][]>>;
  setVolMntVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

export default function Microservice({
  imageName,
  setImageList,
  setPortVals,
  setEnvVals,
  setVolVals,
  setVolMntVals,
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
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => {
            setIsSpecShown((prev) => !prev);
            handleGetSpec();
          }}
        >
          {imageName}
        </button>
        <button
          type="button"
          onClick={() => {
            setImageList((prev) => [...new Set([...prev, imageName])]);
            setPortVals((prev) => [...prev, []]);
            setEnvVals((prev) => [...prev, []]);
            setVolVals((prev) => [...prev, []]);
            setVolMntVals((prev) => [...prev, []]);
          }}
        >
          템플릿에 추가
        </button>
      </div>
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
