import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import createElement from '../helpers/create-element';
import handleDebounce from '../helpers/handle-debounce';

// Components
import JSONInput from 'react-json-editor-ajrm';
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en';

const placeholder = {
  elem: 'html',
  children: [
    {
      elem: 'head',
      children: [
        {
          elem: 'link',
          attributes: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@500',
          },
        },
      ],
    },
    {
      elem: 'body',
      attributes: {
        class: 'instagram',
      },
      children: [
        {
          elem: 'h1',
          text: 'hello world',
        },
      ],
    },
  ],
};

const Home: NextPage = () => {
  const [jsonOutput, setJsonOutput] = useState({} as any);
  const [render, setRender] = useState('');
  const [mount, setMount] = useState(false);
  const [renderKey, setRenderKey] = useState(Math.random());

  useEffect(() => {
    setMount(true);
  }, []);

  function handleChange(e: any) {
    console.log('e', e);
    setJsonOutput(e);
    if (e.jsObject) {
      handleDebounce(() => {
        setRender(createElement(e.jsObject));
        setRenderKey(Math.random);
      }, 1000);
    }
  }

  console.log(`r=${new URLSearchParams(render).toString()}`);

  return (
    <div>
      <Head>
        <title>Template Image</title>
        <meta name='description' content='Template Image' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='margin-left-16'>
        <header className='flex-start-center'>
          <h1>Template Image</h1>
          <p className='margin-top-24 margin-left-16'>Created By Jules Patry</p>
        </header>

        <div className='flex'>
          <div>
            {jsonOutput.error && jsonOutput.error.reason && <p>{jsonOutput.error.reason}</p>}
            {mount && (
              <JSONInput
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleChange}
                locale={locale}
                height='1050px'
              />
            )}
            <a href={`/api/render?r=${new URLSearchParams(render).toString()}`} target='_blank' rel='noopener noreferrer'>
              <button>View Image</button>
            </a>
          </div>
          <div className='margin-left-24 margin-right-24' style={{ backgroundColor: 'black', width: 10, height: 1050 }} />
          <div className={'render'}>
            {<img key={renderKey} src={`/api/render?r=${new URLSearchParams(render).toString()}`} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
