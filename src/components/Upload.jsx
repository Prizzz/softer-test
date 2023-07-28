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
          .then((data) => {
            if (data.error) {
              throw new Error(`${data.error} - ${data.message}`);
            } else {
              fetch(`${data.href}`, { method: "PUT", body: formData })
                .then((res) => {
                  if (res.ok) {
                    console.log("Файлы успешно загружены");
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  };

  const files = fileList ? [...fileList] : [];

  return (
    <>
      {tokenData && (
        <div className="upload">
          <div>
            <p className="upload-title">Выберите файлы для загрузки</p>

            <input type="file" onChange={handleFileChange} multiple />

            <ul>
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>

            <button
              className="upload-button"
              onClick={handleUploadClick}
              disabled={!fileList.length}
            >
              Загрузить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
