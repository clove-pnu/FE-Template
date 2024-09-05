import { useEffect, useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getImageList } from '../../apis/template';
import styles from '../styles/MicroserviceList.module.css';
import Microservice from './Microservice';

export default function MicroserviceList() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getImageList(), {
      onSuccess: (response) => {
        console.log(response);
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
      <div className={styles.title}>마이크로서비스 이미지 목록</div>
      <ul>
        {images && images.map((imageName) => (
          <li
            key={imageName}
            className={styles.image}
          >
            <Microservice imageName={imageName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
