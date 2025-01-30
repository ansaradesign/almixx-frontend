import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  id: string;
  children: React.ReactNode;
};

export const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        return;
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};
