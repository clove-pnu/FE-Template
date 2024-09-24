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
  volumeVals: [string, string, string][][];
  setVolumeVals: React.Dispatch<React.SetStateAction<[string, string, string][][]>>;
  volumeMountVals: [string, string][][];
  setVolumeMountVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  pathPrefix: string[];
  setPathPrefix: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ENVFormProps {
  index: number;
  portVals: [number, string][][];
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  envVals: [string, string][][];
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  volumeVals: [string, string, string][][];
  setVolumeVals: React.Dispatch<React.SetStateAction<[string, string, string][][]>>;
  volumeMountVals: [string, string][][];
  setVolumeMountVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

function ENVForm({
  index,
  portVals,
  setPortVals,
  envVals,
  setEnvVals,
  volumeVals,
  setVolumeVals,
  volumeMountVals,
  setVolumeMountVals,
}: ENVFormProps) {
  const [port, setPort] = useState('');
  const [protocol, setProtocol] = useState('');
  const [evKey, setEvKey] = useState('');
  const [evVal, setEvVal] = useState('');
  const [volValName, setVolValName] = useState('');
  const [volVal, setVolVal] = useState('');
  const [volValType, setVolValType] = useState('');
  const [volMntValName, setVolMntValName] = useState('');
  const [volMntVal, setVolMntVal] = useState('');

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

  const handleAddVolVal = () => {
    if (volValName !== '' && volVal !== '' && volValType !== '') {
      setVolumeVals((prev) => [
        ...prev.slice(0, index),
        [...prev[index], [volValName, volVal, volValType]],
        ...prev.slice(index + 1),
      ]);

      setVolValName('');
      setVolVal('');
      setVolValType('');
    }
  };

  const handleAddVolMntVal = () => {
    if (volMntValName !== '' && volMntVal !== '') {
      setVolumeMountVals((prev) => [
        ...prev.slice(0, index),
        [...prev[index], [volMntValName, volMntVal]],
        ...prev.slice(index + 1),
      ]);

      setVolMntValName('');
      setVolMntVal('');
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

  const handleDeleteVolVal = (volValIndex: number) => {
    setVolumeVals((prev) => [
      ...prev.slice(0, index),
      [...prev[index].slice(0, volValIndex), ...prev[index].slice(volValIndex + 1)],
      ...prev.slice(index + 1),
    ]);
  };

  const handleDeleteVolMntVal = (volMntValIndex: number) => {
    setVolumeMountVals((prev) => [
      ...prev.slice(0, index),
      [...prev[index].slice(0, volMntValIndex), ...prev[index].slice(volMntValIndex + 1)],
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
      <InputWithLabel
        name="Volume name"
        value={volValName}
        setValue={setVolValName}
      />
      <InputWithLabel
        name="Volume value"
        value={volVal}
        setValue={setVolVal}
      />
      <InputWithLabel
        name="Volume type"
        value={volValType}
        setValue={setVolValType}
      />
      <button
        type="button"
        onClick={handleAddVolVal}
      >
        추가
      </button>
      <ul className={styles.envValList}>
        {volumeVals[index].map(([vvn, vv, vvt], volValIndex) => (
          <li
            key={`${vvn}-${vv}-${vvt}`}
            className={styles.envVal}
          >
            <div>{`"${vvn}", "${vv}", "${vvt}"`}</div>
            <button
              type="button"
              onClick={() => handleDeleteVolVal(volValIndex)}
            >
              제거
            </button>
          </li>
        ))}
      </ul>
      <InputWithLabel
        name="Volume mount name"
        value={volMntValName}
        setValue={setVolMntValName}
      />
      <InputWithLabel
        name="Volume mount value"
        value={volMntVal}
        setValue={setVolMntVal}
      />
      <button
        type="button"
        onClick={handleAddVolMntVal}
      >
        추가
      </button>
      <ul className={styles.envValList}>
        {volumeMountVals[index].map(([vmvn, vmv], volMntValIndex) => (
          <li
            key={`${vmvn}-${vmv}`}
            className={styles.envVal}
          >
            <div>{`"${vmvn}", "${vmv}"`}</div>
            <button
              type="button"
              onClick={() => handleDeleteVolMntVal(volMntValIndex)}
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
  volumeVals,
  setVolumeVals,
  volumeMountVals,
  setVolumeMountVals,
  pathPrefix,
  setPathPrefix,
}: CreateTemplateProps) {
  const [templateName, setTemplateName] = useState('');
  const [templateNickname, setTemplateNickname] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTemplate = () => {
    if (templateName !== '' && templateNickname !== '' && description !== '' && imageList.length > 0) {
      fetchWithHandler(() => createTemplate({
        name: templateName,
        nickname: templateNickname,
        description,
        images: imageList,
        portVals,
        envVals,
        volVals: volumeVals,
        volMntVals: volumeMountVals,
        pathPrefix,
      }), {
        onSuccess: () => {
          setTemplateName('');
          setImageList([]);
          setPortVals([]);
          setEnvVals([]);
          setVolumeVals([]);
          setVolumeMountVals([]);
          setPathPrefix([]);
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
      <InputWithLabel
        name="판매자에게 보여줄 템플릿 이름"
        value={templateNickname}
        setValue={setTemplateNickname}
      />
      <InputWithLabel
        name="판매자에게 보여줄 템플릿 설명"
        value={description}
        setValue={setDescription}
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
            <label
              htmlFor={`${image}-${index}-pathprefix`}
              className={styles.label}
            >
              <div className={styles.labelName}>Gateway API 경로</div>
              <input
                type="text"
                id={`${image}-${index}-pathprefix`}
                value={pathPrefix[index]}
                onChange={(e) => setPathPrefix((prev) => [
                  ...prev.slice(0, index),
                  e.target.value,
                  ...prev.slice(index + 1),
                ])}
              />
            </label>
            <ENVForm
              index={index}
              portVals={portVals}
              setPortVals={setPortVals}
              envVals={envVals}
              setEnvVals={setEnvVals}
              volumeVals={volumeVals}
              setVolumeVals={setVolumeVals}
              volumeMountVals={volumeMountVals}
              setVolumeMountVals={setVolumeMountVals}
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
