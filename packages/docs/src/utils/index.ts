const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const wrapPromise = (promise, ...params) => {
  let status = STATUS.PENDING;
  let results;

  const suspender = promise(...params)
    .then((r) => {
      status = STATUS.SUCCESS;
      results = r;
    })
    .catch((e) => {
      status = STATUS.ERROR;
      results = e;
    });

  return {
    read() {
      switch (status) {
        case STATUS.PENDING:
          throw suspender;
        case STATUS.SUCCESS:
          return results; // 결과값을 리턴하는 경우 성공 UI를 보여준다
        case STATUS.ERROR:
          throw results; // Error을 throw하는 경우 ErrorBoundary의 Fallback UI를 보여준다
        default:
          break;
      }
    },
  };
};

const cache = new Map();
export const loadScript = (source: string) => {
  let resource = cache.get(source);
  if (resource) return resource;

  resource = wrapPromise(
    () =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = source;
        script.addEventListener('load', () => {
          resolve(source);
        });
        script.addEventListener('error', () =>
          reject(new Error(`Failed to load script ${source}`)),
        );
        document.body.appendChild(script);
      }),
  );

  cache.set(source, resource);
  return resource;
};
