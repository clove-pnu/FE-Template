interface JsonViewerProps {
  data: any;
  depth: number;
}

export default function JsonViewer({ data, depth }: JsonViewerProps) {
  if (data === null) {
    return (
      <>
      </>
    );
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <div>
              {key}
              :
              {' '}
            </div>
            <JsonViewer
              data={value}
              depth={depth + 1}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <JsonViewer
              data={item}
              depth={depth + 1}
            />
          </li>
        ))}
      </ul>
    );
  }

  return <span>{data}</span>;
}
