import React from 'react';
import { FaEye, FaPlus, FaRegEye } from 'react-icons/fa';
import { server } from '../redux/store';
import { CartItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

type ProductProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard: React.FC<ProductProps> = ({
    productId,
    price,
    name,
    photo,
    stock,
    handler
}) => {
    const navigate = useNavigate();

    const detailsHandler = () => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className='product-card'>
            <img src={`${server}/${photo}`} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>
            <div>
                <button onClick={() => handler({
                    productId,
                    price,
                    name,
                    photo,
                    stock,
                    quantity: 1
                })}>
                    <FaPlus />
                </button>
                
                <button onClick={detailsHandler}>
                    <FaRegEye />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
