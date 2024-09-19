import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { deleteTempalte, getTemplateDetail } from '../../apis/template';
import styles from '../styles/Template.module.css';
import JsonViewer from './JsonViewer';

interface TemplateProps {
  index: number;
  templateName: string;
  setTemplateList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Template({
  index,
  templateName,
  setTemplateList,
}: TemplateProps) {
  const [isDetailShown, setIsDetailShown] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isDetailCalled, setIsDetailCalled] = useState(false);

  const handleGetDetail = () => {
    if (!isDetailCalled) {
      fetchWithHandler(() => getTemplateDetail({ item: templateName }), {
        onSuccess: (response) => {
          setDetail(response.data);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }

    setIsDetailCalled(true);
  };

  const handleDeleteTemplate = () => {
    deleteTempalte({ item: templateName });
    setTemplateList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => {
            setIsDetailShown((prev) => !prev);
            handleGetDetail();
          }}
        >
          {templateName}
        </button>
        <button
          type="button"
          onClick={() => handleDeleteTemplate()}
        >
          템플릿 삭제
        </button>
      </div>
      {isDetailShown
      && (
      <div className={styles.detailContainer}>
        <JsonViewer
          data={detail}
          depth={0}
        />
      </div>
      )}
    </div>
  );
}
