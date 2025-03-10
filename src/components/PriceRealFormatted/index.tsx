interface PriceRealFormattedProps extends React.HTMLAttributes<HTMLSpanElement> {
    price: number;  
}

export default function PriceRealFormatted({ price, ...rest }: PriceRealFormattedProps) {
    return (
        <>
            <span {...rest}>{price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>
        </>
    )
}