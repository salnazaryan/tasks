import React from 'react';
import { getCoinsAPIService } from '../selector';
import { buildQuery } from '../utils';
import Coins, { ICoinsProps } from '../components/coins/Coins';

export default function Home({ coins }: ICoinsProps) {
  return <Coins coins={coins} />;
}

export async function getStaticProps() {
  try {
    const request = await getCoinsAPIService().getCoins(
      buildQuery({ skip: 0, limit: 15, customParams: { currency: 'USD' } })
    );
    const { coins } = request.data;

    return {
      props: {
        coins,
      },
    };
  } catch (error) {
    return {
      props: {
        coins: [],
      },
    };
  }
}
