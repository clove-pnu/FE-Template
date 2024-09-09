import { useState } from 'react';
import MicroserviceList from './components/template/MicroserviceList';
import TemplateList from './components/template/TemplateList';
import UploadMicroservice from './components/template/UploadMicroservice';
import CreateTemplate from './components/template/CreateTemplate';

export default function App() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [portVals, setPortVals] = useState<[number, string][][]>([]);
  const [envVals, setEnvVals] = useState<[string, string][][]>([]);

  return (
    <main>
      <MicroserviceList
        setImageList={setImageList}
        setPortVals={setPortVals}
        setEnvVals={setEnvVals}
      />
      <UploadMicroservice />
      <TemplateList />
      <CreateTemplate
        imageList={imageList}
        setImageList={setImageList}
        portVals={portVals}
        setPortVals={setPortVals}
        envVals={envVals}
        setEnvVals={setEnvVals}
      />
    </main>
  );
}
