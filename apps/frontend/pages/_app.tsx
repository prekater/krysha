import {AppProps} from 'next/app';
import Head from 'next/head';
import {Box, ChakraProvider, Heading, Spacer, Container} from '@chakra-ui/react'

import './styles.css';

function CustomApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title> Крыша </title>
      </Head>
      {/*<Box alignItems='center' >*/}
        {/*<Box p='2'>*/}
        {/*  <Heading size='md'>Крыша</Heading>*/}
        {/*</Box>*/}
        {/*<Spacer/>*/}
        <Component {...pageProps} />
      {/*</Box>*/}
    </>
  );
}

export default CustomApp;
