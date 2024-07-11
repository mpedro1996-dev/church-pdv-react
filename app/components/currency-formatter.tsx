import React from 'react';

interface CurrencyFormatterProps {
    value:number;
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }

  const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
    value,
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  }) => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits,
    });
  
    return formatter.format(value);
  };


  export default CurrencyFormatter;

