import { useEffect, useState } from 'react';
import Title from '../common/Title';
import styles from '../styles/TemplateList.module.css';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { deleteTempalte, getTemplateList } from '../../apis/template';
import Template from './Template';

export default function TemplateList() {
  const [templateList, setTemplateList] = useState<string[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getTemplateList(), {
      onSuccess: (response) => {
        setTemplateList(response.data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  const handleDeleteTemplate = ({
    templateName,
    index,
  }: { templateName: string, index: number }) => {
    deleteTempalte({ item: templateName });
    setTemplateList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <div className={styles.container}>
      <Title>템플릿 목록</Title>
      <ul>
        {templateList.map((template, index) => (
          <li
            key={template}
            className={styles.template}
          >
            <Template templateName={template} />
            <button
              type="button"
              onClick={() => handleDeleteTemplate({ templateName: template, index })}
            >
              템플릿 삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
