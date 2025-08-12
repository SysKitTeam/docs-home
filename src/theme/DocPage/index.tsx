import React from 'react';
import type { ReactNode } from 'react';
import DocPage from '@theme-original/DocPage';
import DescriptionInjector from '@site/src/components/DescriptionInjector';

export default function DocPageWrapper(props: any): ReactNode {
  return (
    <>
      <DocPage {...props} />
      <DescriptionInjector />
    </>
  );
}
