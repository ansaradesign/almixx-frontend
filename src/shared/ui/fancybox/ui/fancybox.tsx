import { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

import './fancybox.css';

interface Props {
  delegate?: string;
  options?: Partial<OptionsType>;
}

export const Fancybox = (props: PropsWithChildren<Props>) => {
  const containerRef = useRef(null);
  const { delegate: nativeDelegate, options: nativeOptions, children } = props;

  useEffect(() => {
    const container = containerRef.current;

    const delegate = nativeDelegate || '[data-fancybox]';
    const options = nativeOptions || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{children}</div>;
};
