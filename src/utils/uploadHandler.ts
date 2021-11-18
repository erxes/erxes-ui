import { getEnv } from '../utils/core';
import Alert from '../utils/Alert';

type FileInfo = {
  name: string;
  size: number;
  type: string;
};

type AfterUploadParams = {
  status: 'ok' | 'error';
  response: any;
  fileInfo: FileInfo;
};

type AfterReadParams = {
  result: any;
  fileInfo: FileInfo;
};

type Params = {
  files: FileList | null;
  beforeUpload: () => void;
  afterUpload: (params: AfterUploadParams) => void;
  afterRead?: (params: AfterReadParams) => void;
  url?: string;
  kind?: string;
  userId?: string;
  responseType?: string;
  extraFormData?: Array<{ key: string; value: string }>;
  erxesApiUrl?: string | null;
};

const getApiUrl = (appUrl: string, erxesApiUrl: string, type: string) => {
  return appUrl !== undefined && !erxesApiUrl
    ? `${appUrl}/${type}`
    : `${erxesApiUrl}/${type}`;
};

export const deleteHandler = (params: {
  fileName: string;
  url?: string;
  afterUpload: ({ status }: { status: string }) => any;
  erxesApiUrl: string | null;
}) => {
  const { REACT_APP_API_URL } = getEnv();
  const erxesApiUrl = params.erxesApiUrl ? params.erxesApiUrl : '';

  const {
    url = getApiUrl(REACT_APP_API_URL, erxesApiUrl, 'delete-file'),
    fileName,
    afterUpload
  } = params;

  fetch(`${url}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `fileName=${fileName}`,
    credentials: 'include'
  }).then(response => {
    response
      .text()
      .then(text => {
        if (!response.ok) {
          return afterUpload({
            status: text
          });
        }

        return afterUpload({ status: 'ok' });
      })
      .catch(error => {
        Alert.error(error.message);
      });
  });
};

const uploadHandler = (params: Params) => {
  const { REACT_APP_API_URL, REACT_APP_FILE_UPLOAD_MAX_SIZE } = getEnv();

  const erxesApiUrl = params.erxesApiUrl ? params.erxesApiUrl : '';

  const {
    files,
    beforeUpload,
    afterUpload,
    afterRead,
    url = getApiUrl(REACT_APP_API_URL, erxesApiUrl, 'upload-file'),
    kind = 'main',
    responseType = 'text',
    userId,
    extraFormData = []
  } = params;

  if (!files) {
    return;
  }

  if (files.length === 0) {
    return;
  }

  // tslint:disable-next-line
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // initiate upload file reader
    const uploadReader = new FileReader();

    const fileInfo = { name: file.name, size: file.size, type: file.type };

    const fileUploadMaxSize =
      REACT_APP_FILE_UPLOAD_MAX_SIZE || 20 * 1024 * 1024;

    // skip file that size is more than REACT_APP_FILE_UPLOAD_MAX_SIZE
    if (fileInfo.size > parseInt(fileUploadMaxSize, 10)) {
      Alert.warning(
        `Your file ${fileInfo.name} size is too large. Upload files less than ${
          fileUploadMaxSize / 1024 / 1024
        }MB of size.`
      );

      continue;
    }

    // after read proccess done
    uploadReader.onloadend = () => {
      // before upload
      if (beforeUpload) {
        beforeUpload();
      }

      const formData = new FormData();
      formData.append('file', file);

      for (const data of extraFormData) {
        formData.append(data.key, data.value);
      }

      fetch(`${url}?kind=${kind}`, {
        method: 'post',
        body: formData,
        credentials: 'include',
        ...(userId ? { headers: { userId } } : {})
      })
        .then(response => {
          response[responseType]()
            .then(text => {
              if (!response.ok) {
                return afterUpload({
                  status: 'error',
                  response,
                  fileInfo
                });
              }

              // after upload
              if (afterUpload) {
                afterUpload({ status: 'ok', response: text, fileInfo });
              }
            })
            .catch(error => {
              Alert.error(error.message);
            });
        })
        .catch(error => {
          Alert.error(error.message);
        });
    };

    // begin read
    uploadReader.readAsArrayBuffer(file);

    // read as data url for preview purposes
    const reader = new FileReader();

    reader.onloadend = () => {
      if (afterRead) {
        afterRead({ result: reader.result, fileInfo });
      }
    };

    reader.readAsDataURL(file);
  }
};

export default uploadHandler;
