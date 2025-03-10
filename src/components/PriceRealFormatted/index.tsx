interface PriceRealFormattedProps extends React.HTMLAttributes<HTMLParagraphElement> {
    price: number;  
}

export default function PriceRealFormatted({ price, ...rest }: PriceRealFormattedProps) {
    return (
        <>
            <p {...rest}>{price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
        </>
    )
}