import React from 'react';

import styles from './$index.module.css';

import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

import { renderDocument } from './../_document';
import { renderPage, hydrate } from '@goldstack/template-ssr';

import { images } from './../lib/data';

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

function rand(items) {
  return items[(items.length * Math.random()) | 0];
}

const Index = (props: { message: string }): JSX.Element => {
  return (
    <>
      <div
        className={styles.image}
        style={{
          background: `url(_goldstack/static/${
            rand(images).name
          }) no-repeat center center`,
        }}
      ></div>
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
