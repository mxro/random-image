import React from 'react';

import styles from './$index.module.css';

import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

import { renderDocument } from './../_document';
import { renderPage, hydrate } from '@goldstack/template-ssr';

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

const Index = (props: { message: string }): JSX.Element => {
  return (
    <>
      <div className={styles.message}>{props.message}</div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: ProxyHandler = async (event, context) => {
  return renderPage({
    component: Index,
    properties: {
      message: 'A random image will be displayed here',
      dummy: 123,
    },
    entryPoint: __filename,
    event: event,
    renderDocument,
  });
};

hydrate(Index);

export default Index;
