import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Chart from '../core/chart/Chart';
import { ICoin, ICoinChart } from '../../types';
import { formatCurrency } from '../../utils';
import { getCoinsAPIService } from '../../selector';

export interface ICoinProps {
  coin: ICoin;
  chart: ICoinChart;
}

interface SelectOption {
  value: string;
  label: string;
}

const PERIODS: SelectOption[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: '1y',
    label: '1 Year',
  },
  {
    value: '6m',
    label: '6 Months',
  },
  {
    value: '3m',
    label: '3 Months',
  },
  {
    value: '1m',
    label: '1 Months',
  },
  {
    value: '1w',
    label: '1 Week',
  },
  {
    value: '24h',
    label: '24 Hours',
  },
];

export default function Coin(props: ICoinProps) {
  const { coin, chart: loadedChart } = props;
  const {
    id,
    icon,
    name,
    symbol,
    rank,
    price,
    marketCap,
    volume,
    availableSupply,
    totalSupply,
    websiteUrl,
    twitterUrl,
  } = coin;
  const [period, setPeriod] = useState<string>('24h');
  const [chart, setChart] = useState<ICoinChart>([]);

  useEffect(() => {
    setChart(loadedChart);
  }, []);

  const handlePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedPeriod = event.target.value as string;
    setPeriod(selectedPeriod);
    getChartData(selectedPeriod);
  };

  const getChartData = async (period: string) => {
    try {
      const request = await getCoinsAPIService().getCoinChart(id, period);
      const { chart } = request.data;
      setChart(chart);
    } catch (error) {}
  };

  return (
    <div className="coin">
      <div className="details">
        <div className="coin-info">
          <Grid container spacing={2}>
            <Grid item>
              <List className="list">
                <ListItem>
                  <ListItemAvatar className="icon-section">
                    <Avatar alt="Icon" src={icon} />
                  </ListItemAvatar>
                  <ListItemText primaryTypographyProps={{ component: 'div', className: 'coin-name' }}>
                    <span>{name}</span>
                    <span>({symbol})</span>
                    <span className="rank">#{rank}</span>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon className="icon-section" />
                  <ListItemText className="coin-price">
                    <span>{formatCurrency(price?.toFixed(2))}</span>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List className="list">
                <ListItem>
                  <ListItemText primary="Market Cap" secondary={marketCap} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Volume 24H" secondary={volume} />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List className="list">
                <ListItem>
                  <ListItemText
                    primary="Available Supply"
                    secondary={formatCurrency(availableSupply?.toString(), '')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total Supply" secondary={formatCurrency(totalSupply?.toString(), '')} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
        <Divider orientation="vertical" />
        <div className="social-info">
          <div className="single-social-info">
            <span>Website</span>
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              {websiteUrl}
            </a>
          </div>
          <div className="single-social-info">
            <span>Community</span>
            <a href={twitterUrl} target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <Divider className="horizontal-divider" />
      <FormControl variant="outlined">
        <InputLabel id="period">Period</InputLabel>
        <Select labelId="period" value={period} onChange={handlePeriodChange} label="Period">
          {PERIODS.map(({ value, label }: SelectOption) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Chart data={chart} label="Price in USD" />
    </div>
  );
}
