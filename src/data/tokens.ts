import {formatUnits} from 'ethers';

const apiKey = 'iUoiscmfWwgn-6WiWEWtFw7wyvI1Dpbs';

const ChainChangeModule = (chainId: number) => {
  switch (chainId) {
    case 137:
      return 'polygon-mainnet';

    case 1:
      return 'eth-mainnet';

    default:
      return 'polygon-mainnet';
  }
};
const selectedChainBasedOnChainId = (chainId: number) => {
  switch (chainId) {
    case 137:
      return 'polygon';

    case 1:
      return 'eth';

    default:
      return 'polygon';
  }
};

export const getUserTokens = async (chainId: number, address: string) => {
  if (address) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append(
      'X-API-Key',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU2YTNjMjEzLWUyOTktNDIxMi1hMWM3LWYyYjU5Nzk5NDZkYSIsIm9yZ0lkIjoiMzgxOTg0IiwidXNlcklkIjoiMzkyNDk4IiwidHlwZUlkIjoiNjEzMmU2NDItZGQ1ZS00YWRjLWFjMmItNTY0OTg0Yzg4MTYwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDk5OTkwNjYsImV4cCI6NDg2NTc1OTA2Nn0.vSXZ2_4ASRXBXjR6w-ipfijDYKpANkRvZTOCY-GjNo4',
    );

    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const fetchURL = `https://deep-index.moralis.io/api/v2.2/0x98dA6FDA6e33c34247F4d3287c19f7770dD6bE25/erc20?chain=${selectedChainBasedOnChainId(
      chainId,
    )}`;
    const response = await fetch(fetchURL, requestOptions);
    const result = await response?.json();
    console.log(result);
    return result;
  } else {
    console.log('address is missing');
  }
};

export const tokensMetadata = async (
  params: Array<string>,
  chainId: number,
) => {
  console.log('enter');

  if (params?.length > 0) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('content-type', 'application/json');
    myHeaders.append(
      'Cookie',
      '_cfuvid=nz97wBuNVsU5OOKLrO5WVhFSP.._2nH.AZi2nbfbA24-1733654197485-0.0.1.1-604800000',
    );

    const raw = JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'alchemy_getTokenMetadata',
      params: ['0x162539172b53e9a93b7d98fb6c41682de558a320'],
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://polygon-mainnet.g.alchemy.com/v2/iUoiscmfWwgn-6WiWEWtFw7wyvI1Dpbs',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  } else {
    console.log({params});
  }
};
