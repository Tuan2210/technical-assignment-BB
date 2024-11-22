import { forwardRef } from 'react';
import { FlippingCard, FlippingCardBack, FlippingCardFront } from 'react-ui-cards';
import { Product } from '../../../services/apiRequests';

interface PrdDetails {
  product: Product;
}

/**
 * Cart component display product information details
 */
const Card = forwardRef<HTMLDivElement, PrdDetails>(({ product }: PrdDetails, ref) => {
  return (
    <div ref={ref} className='w-fit border-2 border-solid border-gray-300 rounded-xl bg-gradient-to-t from-white to-gray-300'>
      <FlippingCard>
        <FlippingCardFront>
          <div
            key={product.id}
            className='product-item flex flex-col items-center justify-center gap-4'
          >
            <img src={product.thumbnail} alt={product.title} className='w-full h-auto' />
            <div>
              <p className='text-lg text-center font-bold'>{product.title}</p>
              <p className='text-center'>${product.price}</p>
            </div>
          </div>
        </FlippingCardFront>
        <FlippingCardBack>
          <div className="p-4 grid place-items-center h-full text-justify">
            <p>{product.description}</p>
          </div>
        </FlippingCardBack>
      </FlippingCard>
    </div>
  );
});

export default Card;