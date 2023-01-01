import React, { ComponentProps, useEffect, useState, Suspense } from 'react';

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

type Props = ComponentProps<typeof Suspense>;
function CustomSuspense(props: Props) {
  const isMounted = useMounted();

  if (!isMounted) {
    return <>{props.fallback}</>;
  }

  return <Suspense {...props} />;
}

export default CustomSuspense;
