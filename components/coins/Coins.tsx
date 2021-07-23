import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from '@material-ui/core';
import Table from '../core/table/Table';
import { ICoin, ICoins, IRow } from '../../types';
import { getCoinsAPIService } from '../../selector';
import { buildQuery } from '../../utils';

export interface ICoinsProps {
  coins: ICoins;
}

const COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'priceChange1h',
    headerName: '1H CHANGE',
  },
  {
    field: 'priceChange1d',
    headerName: '24H CHANGE',
  },
  {
    field: 'priceChange1w',
    headerName: '7D CHANGE',
  },
  {
    field: 'price',
    headerName: 'Price',
  },
  {
    field: 'priceBtc',
    headerName: 'Price in BTC',
  },
  {
    field: 'marketCap',
    headerName: 'MARKET CAP',
  },
  {
    field: 'volume',
    headerName: 'VOLUME 24H',
  },
];

export default function Coins(props: ICoinsProps) {
  const { coins: loadedCoins } = props;
  const [coins, setCoins] = useState<ICoins>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCoins(loadedCoins);
  }, []);

  const getMoreCoins = async () => {
    try {
      setLoading(true);
      const res = await getCoinsAPIService().getCoins(buildQuery({ skip: coins?.length, limit: 10 }));
      const { coins: receivedCoins } = res.data;
      setCoins((coins: ICoins) => [...coins, ...receivedCoins]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleRowClick = (rowData: IRow) => {
    router.push(`coin/${rowData.id}`);
  };

  return (
    <div className="coins">
      <div className="title">
        <Divider />
        <p>Crypto Tracker</p>
        <Divider />
      </div>
      <div className="infinity-scroll">
        <InfiniteScroll
          dataLength={coins.length}
          scrollThreshold={0.9}
          next={getMoreCoins}
          hasMore={true}
          scrollableTarget="coins-table"
          loader={<h3>{loading ? 'Loading...' : ''}</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <Table id="coins-table" rows={coins} columns={COLUMNS} onRowClick={handleRowClick} />
        </InfiniteScroll>
      </div>
    </div>
  );
}
