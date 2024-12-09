/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { medic } from '../Data/Data';
import { toast } from 'react-toastify';
const UserContext = createContext()

export function ContextPovider({ children }) {
    // ................responsive.............
    const [mobile, SetMobile] = useState(window.innerWidth < 1010)
    const [menu, GetMenue] = useState(false);

    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 1010)
        }
        const HundleClick = () => {
            GetMenue(false)
        }

        window.addEventListener('resize', hundleSize)
        window.addEventListener('click', HundleClick)
        return () => {
            window.removeEventListener('click', HundleClick)
            window.removeEventListener('resize', hundleSize)
        }
    }, [])


    // ............................medicamment et card................
    const [medicament, setmedicament] = useState(medic);
    const [cart, setCart] = useState([]);

    const [nombreMedic, setnombreMedic] = useState(0);

    const [total, setTotal] = useState(0);
    const [enfantId, setenfatId] = useState(0);

    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.amount;
        }, 0);
        setTotal(total);
    }, []);


    // nombre des produits
    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);
            setnombreMedic(amount);
        }
    }, [cart]);


    // add to cart
    const AjoutApnier = (med, id) => {
        const newItem = { ...med, amount: 1 };
        const cartItem = cart.find((item) => {
            return item.id === id;
        });

        if (cartItem) {
            const newCart = [...cart].map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 };
                } else return item;
            });
            setCart(newCart);
            toast.success('La quantité du produit a été ajoutée avec succès')
        } else {
            setCart([...cart, newItem]);
            toast.success('Nouveau produit ajouté avec succès')
        }
    };

    const removeOnByOneMedi = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        });
        setCart(newCart);
    };


    const effaceCart = () => {
        setCart([]);
    };


    const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        AjoutApnier(cartItem, id);
    };


    // decrease amount
    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount - 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        }
        if (cartItem.amount < 2) {
            removeOnByOneMedi(id);
        }
    };


    return (
        <UserContext.Provider
            value={{
                medicament,
                mobile,
                menu,
                enfantId,
                setenfatId,
                GetMenue,
                cart,
                AjoutApnier,
                removeOnByOneMedi,
                effaceCart,
                nombreMedic,
                increaseAmount,
                decreaseAmount
            }}
        >
            {children}
        </UserContext.Provider>
    )
}


export const useThemes = () => {
    return useContext(UserContext)
}
