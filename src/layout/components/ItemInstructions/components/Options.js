import React from 'react';
import cn from "classnames";

import OptionSelect from "./OptionSelect";
import TextAreaOption from './TextAreaOption';

export default function({
    className,
    style,
    options,
    selectedOptions,
    optionProperties,
    onSelection,
    onProperty,
    skeleton,
    checkIfHidden,
    onNote,
    isSync,
    ...others
}) {

    if (skeleton || !isSync) {
        return <OptionSelect skeleton / >
    }

    return ( <
        div className = {
            cn(
                "options-l2",
                className,
            )
        }
        style = {
            {
                ...style
            }
        } { ...others
        } >
        {
            options.map((option, index) => {
                const {
                    primary,
                    secondary,
                    type,
                    items,
                    isRequired,
                    min,
                    max,
                } = option;
                const thisSelection = selectedOptions[index];
                const selected = thisSelection.filter(selectedItem => selectedItem);

                return <OptionSelect
                key = {
                    index
                }
                action = {
                    isRequired && "Required"
                }
                hidden = {
                    isRequired && checkIfHidden(thisSelection, type, min)
                }
                disabled = {
                    max && selected.length === max
                }
                onChange = {
                    (data, key) => onSelection(data, index, key, type)
                }
                primary = {
                    primary
                }
                highlighted = {
                    optionProperties[index].highlighted
                }
                secondary = {
                    secondary
                }
                selected = {
                    thisSelection
                }
                type = {
                    type
                }
                items = {
                    items
                }
                onRef = {
                    ref => onProperty(ref, index)
                }
                />
            })
        }

        <
        TextAreaOption max = {
            100
        }
        placeholder = "Leave a special instruction for the kitchen"
        onChange = {
            onNote
        }
        header = "Special Instruction" /
        >
        <
        /div>
    );
}