import { useEffect, useState } from 'react';
import countryList from './CountryList';

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
          `https://v6.exchangerate-api.com/v6/e3ba77f22c3942f67154b0be/latest/${fromCurrency}`
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

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>, isFromCurrency: boolean) => {
    if (isFromCurrency) {
      setFromCurrency(e.target.value);
    } else {
      setToCurrency(e.target.value);
    }
  };

  const isolateClic =(e: React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation();
  }

  return (
    <div onClick={isolateClic} >
      <form className="currency-form">

        <select value={toCurrency} onChange={(e) => handleCurrencyChange(e, false)} className='rounded-md' >
          {Object.keys(countryList).map((currency_code) => (
            <option key={currency_code} value={currency_code}>
              {currency_code}
            </option>
          ))}
        </select>
      </form>
      <div className='font-semibold text-base'>
         {convertedPrice} {toCurrency}  <span  className='text-xs text-neutral-500'> / 24hrs </span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
