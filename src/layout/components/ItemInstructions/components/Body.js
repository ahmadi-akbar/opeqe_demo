import React, {
    useState,
    useEffect
} from 'react';
import cn from "classnames";
import produce from 'immer';
import {
    connect
} from "react-redux";

import Submit from "./Submit";

import getUserAuth from "../../../../store/selectors/user/getUserAuth";
import addToCart from "../../../../store/actions/cart/addItem";

import Options from "./Options";

export function Index({
    className,
    style,
    onClose,
    itemData,
    padding,
    maxCount,
    options,
    addToCart,
    auth,
    full,
    history,
    match,
    location,
    staticContext,
    container,
    skeleton,
    ...others
}) {

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [optionProperties, setOptionProperties] = useState([]);

    const [note, setNote] = useState('');

    useEffect(() => {
        if (!options) {
            return;
        }
        setSelectedOptions(options.map(option => {
            return option.items.map(item => false)
        }));
        setOptionProperties(options.map(() => ({})));
    }, [options]);


    function handlePropertyAvailable(ref, index) {
        setOptionProperties(produce(newState => {
            newState[index].offsetTop = ref.current.offsetTop;
        }));
    }

    function handleSelection(data, index, key, type) {
        const {
            checked,
        } = data.target;

        setSelectedOptions(produce(newState => {
            switch (type) {
                case 'check':
                    {
                        newState[index][key] = checked;
                        break;
                    }
                case 'radio':
                    {
                        newState[index] = newState[index].map(item => false);
                        newState[index][key] = true;
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }));

        setOptionProperties(produce(newState => {
            newState[index].highlighted = false;
        }));
    }


    function handleSubmit(count) {

        for (let i = 0; i < options.length; i++) {
            const {
                isRequired,
                type,
                min
            } = options[i];
            if (!isRequired) {
                continue;
            }
            if (!checkIfHidden(selectedOptions[i], type, min)) {
                const option = optionProperties[i];
                setOptionProperties(produce(newState => {
                    newState[i].highlighted = true;
                }));
                container.scroll({
                    top: option.offsetTop - 90,
                    behavior: 'smooth'
                });
                return;
            }
        }

        submit(count);

        if (onClose) {
            onClose();
        }
    }


    function submit(count) {
        let instructions = [];
        const selectionArray = selectedOptions.map((selection, selectionIndex) => {
            return selection.reduce((selectedIndexes, item, index) => {
                if (!item) {
                    return selectedIndexes;
                }
                selectedIndexes.push(index);
                const group = options[selectionIndex];
                const groupItem = group.items[index];

                instructions.push({
                    id: groupItem.key,
                    categoryId: group.id,
                    categoryTitle: group.primary,
                    title: groupItem.primary,
                    price: groupItem.price,
                    priority: groupItem.priority,
                });

                return selectedIndexes;
            }, []);
        })

        addToCart({
            id: itemData.id,
            price: itemData.price,
            count,
            instructions,
            note,
            selectionArray,
        });
    }

    const isSync = checkIfSync(selectedOptions, options);

    const totalPrice = isSync ? getTotalPrice(selectedOptions, options) : itemData.price;

    return ( <
        div className = {
            cn(
                'body-l2',
                className
            )
        }
        style = {
            {
                paddingTop: `${padding}px`,
                ...style
            }
        } { ...others
        } >
        <
        div className = "options" >
        <
        Options isSync = {
            isSync
        }
        skeleton = {
            skeleton
        }
        options = {
            options
        }
        selectedOptions = {
            selectedOptions
        }
        optionProperties = {
            optionProperties
        }
        onSelection = {
            handleSelection
        }
        onProperty = {
            handlePropertyAvailable
        }
        checkIfHidden = {
            checkIfHidden
        }
        onNote = {
            event => setNote(event.target.value)
        }
        />                 <
        /div>

        <
        Submit full = {
            full
        }
        totalPrice = {
            totalPrice + itemData.price
        }
        max = {
            maxCount
        }
        onClick = {
            handleSubmit
        }
        disabled = {
            skeleton
        }
        /> <
        /div>
    );
}



function checkIfSync(selection, options) {
    if (!options || options.length !== selection.length) {
        return false;
    }

    for (let i = 0; i < options.length; i++) {
        const items = options[i].items;
        if (!selection[i] || items.length !== selection[i].length) {
            return false;
        }
    }
    return true;
}


function getTotalPrice(selection, options) {
    return selection.reduce((outTotal, items, index) => {
        const inner = items.reduce((innerTotal, item, key) => {
            const {
                price
            } = options[index].items[key];
            if (item && price) {
                return innerTotal + price;
            } else {
                return innerTotal;
            }
        }, 0);

        return outTotal + inner;
    }, 0);
}


function checkIfHidden(selection, type, min) {
    const selected = selection.filter(item => item);

    let hidden;
    switch (type) {
        case 'check':
            {
                hidden = min ?
                selected.length >= min :
                    selected.length > 0;
                break;
            }
        case 'radio':
            {
                hidden = selected.length > 0;
                break;
            }
        default:
            {
                break;
            }
    }
    return hidden;
}



export default connect(state => ({
    auth: getUserAuth(state),
}), {
    addToCart,
})(Index);