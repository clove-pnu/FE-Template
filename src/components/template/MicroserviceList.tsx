import { useEffect, useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getImageList } from '../../apis/template';
import styles from '../styles/MicroserviceList.module.css';
import Microservice from './Microservice';
import Title from '../common/Title';

interface MicroserviceListProps {
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  setVolMntVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

export default function MicroserviceList({
  setImageList,
  setPortVals,
  setEnvVals,
  setVolMntVals,
}:MicroserviceListProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getImageList(), {
      onSuccess: (response) => {
        const result = response.data.flat();
        setImages(result);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <Title>마이크로서비스 이미지 목록</Title>
      <ul>
        {images.map((imageName) => (
          <li
            key={imageName}
            className={styles.image}
          >
            <Microservice imageName={imageName} />
            <button
              type="button"
              onClick={() => {
                setImageList((prev) => [...new Set([...prev, imageName])]);
                setPortVals((prev) => [...prev, []]);
                setEnvVals((prev) => [...prev, []]);
                setVolMntVals((prev) => [...prev, []]);
              }}
            >
              템플릿에 추가
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
