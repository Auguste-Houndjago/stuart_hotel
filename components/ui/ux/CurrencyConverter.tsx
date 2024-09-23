import React, { useEffect, useState } from 'react';
import countryList from './CountryList';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CurrencyConverterProps {
  roomPrice: number;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ roomPrice }) => {
  const [fromCurrency, setFromCurrency] = useState<string>('XOF');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [convertedPrice, setConvertedPrice] = useState<string>(roomPrice.toFixed(2));

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/aee815df497749f6afd149d7/latest/${fromCurrency}`
        );
        const result = await response.json();
        const rate = result.conversion_rates[toCurrency];
        setExchangeRate(rate);
        setConvertedPrice((roomPrice * rate).toFixed(2));
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, roomPrice]);

  const handleCurrencyChange = (value: string, isFromCurrency: boolean) => {
    if (isFromCurrency) {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
  };

  const isolateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div onClick={isolateClick}>
      <form className="currency-form">
        <Select value={toCurrency} onValueChange={(value) => handleCurrencyChange(value, false)} >
          <SelectTrigger className="max-w-20 h-2 border-none ">
            <SelectValue placeholder="convert currency" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(countryList).map((currency_code) => (
              <SelectItem key={currency_code} value={currency_code}>
                {currency_code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
      <div className='font-semibold text-sm'>
        {convertedPrice} <span className='font-light'>{toCurrency}</span> <span className='text-xs text-neutral-500'>/ 24hrs</span>
      </div>
    </div>
  );
};

export default CurrencyConverter;


