import { useState } from "react";

const Upload = ({ tokenData }) => {
  const [fileList, setFileList] = useState("");

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList.length) {
      return;
    }

    if (fileList.length > 100) {
      alert("Кол-во файлов не должно превышать 100");
    } else {
      const token = localStorage.getItem("token");

      files.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);

        fetch(
          `https://cloud-api.yandex.net/v1/disk/resources/upload?path=/${file.name}&overwrite=true`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((uploadLink) => fetch(`${uploadLink.href}`, { method: "PUT", body: formData }));
      });
    }
  };

  const files = fileList ? [...fileList] : [];

  return (
    <div>
      {tokenData && (
        <>
          <p>Выберите файлы для загрузки</p>

          <input type="file" onChange={handleFileChange} multiple />

          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.name} - {file.type}
              </li>
            ))}
          </ul>

          <button onClick={handleUploadClick} disabled={!fileList.length}>
            Загрузить
          </button>
        </>
      )}
    </div>
  );
};

export default Upload;
