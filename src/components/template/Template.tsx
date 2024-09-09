import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getTemplateDetail } from '../../apis/template';
import styles from '../styles/Template.module.css';

interface TemplateProps {
  templateName: string;
}

export default function Template({ templateName }: TemplateProps) {
  const [isDetailShown, setIsDetailShown] = useState(false);
  const [detail, setDetail] = useState([]);
  const [isDetailCalled, setIsDetailCalled] = useState(false);

  const handleGetDetail = () => {
    if (!isDetailCalled) {
      fetchWithHandler(() => getTemplateDetail({ item: templateName }), {
        onSuccess: (response) => {
          console.log(response);
          // const obj = response.data;
          // setDetail(Object.keys(obj).map((key) => [key, obj[key]]));
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }

    setIsDetailCalled(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsDetailShown((prev) => !prev);
          handleGetDetail();
        }}
      >
        {templateName}
      </button>
      {isDetailShown
      && (
      <ul className={styles.detailContainer}>
        <li>detail</li>
        {/* {detail.map(([key, value]) => (
          <li
            key={key}
            className={styles.detail}
          >
            <div className={styles.detailValue}>{key}</div>
            :
            <div className={styles.detailValue}>{value}</div>
          </li>
        ))} */}
      </ul>
      )}
    </div>
  );
}
