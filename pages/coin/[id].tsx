import React from 'react';
import { getCoinsAPIService } from '../../selector';
import Coin, { ICoinProps } from '../../components/coins/Coin';

export default function Index({ coin, chart }: ICoinProps) {
  return <Coin coin={coin} chart={chart} />;
}

export async function getServerSideProps({ params }: any) {
  try {
    const { id } = params;
    const coinRequest = await getCoinsAPIService().getCoin(id);
    const chartRequest = await getCoinsAPIService().getCoinChart(id);
    const { coin } = coinRequest.data;
    const { chart } = chartRequest.data;

    return {
      props: {
        coin,
        chart,
      },
    };
  } catch (error) {
    return {
      props: {
        coin: {},
        chart: [],
      },
    };
  }
}
