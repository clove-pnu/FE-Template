import { useState } from 'react';
import InputWithLabel from '../common/InputWithLabel';
import Title from '../common/Title';
import styles from '../styles/CreateTemplate.module.css';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { createTemplate } from '../../apis/template';

interface CreateTemplateProps {
  imageList: string[];
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  portVals: [number, string][][];
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  envVals: [string, string][][];
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

interface ENVFormProps {
  index: number;
  portVals: [number, string][][];
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  envVals: [string, string][][];
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

function ENVForm({
  index,
  portVals,
  setPortVals,
  envVals,
  setEnvVals,
}: ENVFormProps) {
  const [port, setPort] = useState('');
  const [protocol, setProtocol] = useState('');
  const [evKey, setEvKey] = useState('');
  const [evVal, setEvVal] = useState('');

  const handleAddPort = () => {
    if (port !== '' && protocol !== '') {
      setPortVals((prev) => [...prev.slice(0, index),
        [...prev[index], [Number(port), protocol]],
        ...prev.slice(index + 1)]);
      setPort('');
      setProtocol('');
    }
  };

  const handleAddEnv = () => {
    if (evKey !== '' && evVal !== '') {
      setEnvVals((prev) => [
        ...prev.slice(0, index),
        [...prev[index], [evKey, evVal]],
        ...prev.slice(index + 1),
      ]);
      setEvKey('');
      setEvVal('');
    }
  };

  const handleDeletePort = (portIndex: number) => {
    setPortVals((prev) => [
      ...prev.slice(0, index),
      [...prev[index].slice(0, portIndex), ...prev[index].slice(portIndex + 1)],
      ...prev.slice(index + 1),
    ]);
  };

  const handleDeleteEnv = (envIndex: number) => {
    setEnvVals((prev) => [
      ...prev.slice(0, index),
      [...prev[index].slice(0, envIndex), ...prev[index].slice(envIndex + 1)],
      ...prev.slice(index + 1),
    ]);
  };

  return (
    <div className={styles.envFormContainer}>
      <InputWithLabel
        name="포트"
        value={port}
        setValue={setPort}
      />
      <InputWithLabel
        name="프로토콜"
        value={protocol}
        setValue={setProtocol}
      />
      <button
        type="button"
        onClick={handleAddPort}
      >
        추가
      </button>
      <ul className={styles.portValList}>
        {portVals[index].map(([curPort, curProtocol], portIndex) => (
          <li
            key={`${curPort}-${curProtocol}`}
            className={styles.portVal}
          >
            <div>{`${curPort}, ${curProtocol}`}</div>
            <button
              type="button"
              onClick={() => handleDeletePort(portIndex)}
            >
              제거
            </button>
          </li>
        ))}
      </ul>
      <InputWithLabel
        name="환경 변수 키"
        value={evKey}
        setValue={setEvKey}
      />
      <InputWithLabel
        name="환경 변수 값"
        value={evVal}
        setValue={setEvVal}
      />
      <button
        type="button"
        onClick={handleAddEnv}
      >
        추가
      </button>
      <ul className={styles.envValList}>
        {envVals[index].map(([curEnvKey, curEnvVal], envIndex) => (
          <li
            key={`${curEnvKey}-${curEnvVal}`}
            className={styles.envVal}
          >
            <div>{`"${curEnvKey}": "${curEnvVal}"`}</div>
            <button
              type="button"
              onClick={() => handleDeleteEnv(envIndex)}
            >
              제거
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CreateTemplate({
  imageList,
  setImageList,
  portVals,
  setPortVals,
  envVals,
  setEnvVals,
}: CreateTemplateProps) {
  const [templateName, setTemplateName] = useState('');

  const handleCreateTemplate = () => {
    if (templateName !== '' && imageList.length > 0) {
      fetchWithHandler(() => createTemplate({
        name: templateName,
        images: imageList,
        portVals,
        envVals,
      }), {
        onSuccess: () => {
          setTemplateName('');
          setImageList([]);
          setPortVals([]);
          setEnvVals([]);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <Title>템플릿 생성</Title>
      <InputWithLabel
        name="템플릿 이름"
        value={templateName}
        setValue={setTemplateName}
      />
      <div className={styles.title}>마이크로서비스 이미지 목록</div>
      <ul>
        {imageList.map((image, index) => (
          <li
            key={image}
            className={styles.image}
          >
            <div className={styles.imageTitle}>
              <div>{image}</div>
              <button
                type="button"
                onClick={() => {
                  setImageList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
                  setPortVals((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
                  setEnvVals((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
                }}
              >
                제거
              </button>
            </div>
            <ENVForm
              index={index}
              portVals={portVals}
              setPortVals={setPortVals}
              envVals={envVals}
              setEnvVals={setEnvVals}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleCreateTemplate}
      >
        템플릿 생성
      </button>
    </div>
  );
}
